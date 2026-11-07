const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");

const bookAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            appointmentDate,
            appointmentTime,
            reason,
        } = req.body;

        const patientId = req.user._id;

        if (!doctorId || !appointmentDate || !appointmentTime) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory",
            });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Check doctor availability
        if (!doctor.available) {
            return res.status(400).json({
                success: false,
                message: "Doctor is currently unavailable",
            });
        }

        // Check whether the requested slot exists
        const slotIndex = doctor.availableSlots.findIndex(
            (slot) =>
                slot.date === appointmentDate &&
                slot.startTime === appointmentTime
        );

        if (slotIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Selected slot is not available",
            });
        }
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate,
            appointmentTime,
            status: {
                $in: ["Pending", "Confirmed"],
            },
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already booked",
            });
        }

        // Create new appointment
        const appointment = await Appointment.create({
            patientId: req.user._id,
            doctorId,
            appointmentDate,
            appointmentTime,
            reason,
            bookedSlot: {
                date: doctor.availableSlots[slotIndex].date,
                startTime: doctor.availableSlots[slotIndex].startTime,
                endTime: doctor.availableSlots[slotIndex].endTime,
            },
        });

        await Notification.create({
            recipient: doctor.userId,      // Doctor receives the notification
            sender: req.user._id,          // Patient who booked
            title: "New Appointment",
            message: `A new appointment has been booked for ${appointmentDate} at ${appointmentTime}.`,
            type: "BOOKING",
        });

        // Remove booked slot
        doctor.availableSlots.splice(slotIndex, 1);
        await doctor.save();

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            patientId: req.user._id,
        })
            .populate({
                path: "doctorId",
                populate: {
                    path: "userId",
                    select: "name email phone image",
                },
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDoctorAppointments = async (req, res) => {
    try {
        // Find doctor profile using logged-in user's ID
        const doctor = await Doctor.findOne({
            userId: req.user._id,
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found",
            });
        }

        const appointments = await Appointment.find({
            doctorId: doctor._id,
        })
            .populate("patientId", "name email phone image")
            .sort({ appointmentDate: 1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (
            !["Pending", "Confirmed", "Cancelled", "Completed"].includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        // Find logged-in doctor's profile
        const doctor = await Doctor.findOne({
            userId: req.user._id,
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found",
            });
        }

        // Find appointment
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        // Ensure this appointment belongs to the logged-in doctor
        if (appointment.doctorId.toString() !== doctor._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this appointment",
            });
        }

        appointment.status = status;

        await appointment.save();

        await Notification.create({
            recipient: appointment.patientId,
            sender: req.user._id,
            title: "Appointment Status Updated",
            message: `Your appointment has been ${status.toLowerCase()}.`,
            type: "APPOINTMENT",
        });

        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        // Ensure the appointment belongs to the logged-in patient
        if (appointment.patientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Prevent cancelling completed appointments
        if (appointment.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Completed appointments cannot be cancelled",
            });
        }

        // Prevent cancelling twice
        if (appointment.status === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Appointment already cancelled",
            });
        }

        // Mark appointment as cancelled
        appointment.status = "Cancelled";
        await appointment.save();

        // Restore the booked slot to the doctor
        const doctor = await Doctor.findById(appointment.doctorId);

        if (doctor && appointment.bookedSlot) {
            doctor.availableSlots.push({
                date: appointment.bookedSlot.date,
                startTime: appointment.bookedSlot.startTime,
                endTime: appointment.bookedSlot.endTime,
            });

            await doctor.save();
        }

        await Notification.create({
            recipient: doctor.userId,
            sender: req.user._id,
            title: "Appointment Cancelled",
            message: "A patient has cancelled an appointment.",
            type: "CANCELLATION",
        });

        res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully. Slot restored.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    cancelAppointment,
};