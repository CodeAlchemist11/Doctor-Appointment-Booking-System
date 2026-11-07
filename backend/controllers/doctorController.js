const bcrypt = require("bcrypt");

const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "doctor-appointment/doctors",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const addDoctor = async (req, res) => {
    //     image: req.file ? req.file.originalname : "",
    //     console.log("req.file:", req.file);
    // console.log("req.body:", req.body);
    try {
        const {
            name,
            email,
            password,
            phone,
            specialization,
            experience,
            consultationFee,
            hospital,
            education,
            about
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !specialization ||
            !experience ||
            !consultationFee ||
            !hospital ||
            !education
        ) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Doctor already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let imageUrl = "";

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "doctor",
            image: imageUrl,
        });

        const doctor = await Doctor.create({
            userId: newUser._id,
            specialization,
            experience,
            consultationFee,
            hospital,
            education,
            about,
            image: imageUrl,
        });

        res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate("userId", "name email phone image");

        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findById(id)
            .populate("userId", "name email phone image");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            doctor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).populate("userId", "name email phone image");

        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            doctor: updatedDoctor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Delete the associated user
        await User.findByIdAndDelete(doctor.userId);

        // Delete the doctor profile
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAvailability = async (req, res) => {
    try {
        const { available } = req.body;

        // Find doctor using logged-in user's ID
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        doctor.available = available;
        await doctor.save();

        res.status(200).json({
            success: true,
            message: `Doctor is now ${available ? "Available" : "Unavailable"
                }`,
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const addAvailableSlot = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;

        // Validate input
        if (!date || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: "Date, start time and end time are required",
            });
        }

        // Find doctor
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Check duplicate slot
        const slotExists = doctor.availableSlots.some(
            (slot) =>
                slot.date === date &&
                slot.startTime === startTime &&
                slot.endTime === endTime
        );

        if (slotExists) {
            return res.status(400).json({
                success: false,
                message: "This slot already exists",
            });
        }

        // Add new slot
        doctor.availableSlots.push({
            date,
            startTime,
            endTime,
        });

        await doctor.save();

        res.status(201).json({
            success: true,
            message: "Slot added successfully",
            availableSlots: doctor.availableSlots,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAvailableSlots = async (req, res) => {
    try {
        // Find logged-in doctor
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            count: doctor.availableSlots.length,
            availableSlots: doctor.availableSlots,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAvailableSlot = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;
        const { slotId } = req.params;

        // Find logged-in doctor
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Find slot
        const slot = doctor.availableSlots.id(slotId);

        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found",
            });
        }

        // Update only provided fields
        if (date) slot.date = date;
        if (startTime) slot.startTime = startTime;
        if (endTime) slot.endTime = endTime;

        await doctor.save();

        res.status(200).json({
            success: true,
            message: "Slot updated successfully",
            slot,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteAvailableSlot = async (req, res) => {
    try {
        const { slotId } = req.params;

        // Find logged-in doctor
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Find slot index
        const slotIndex = doctor.availableSlots.findIndex(
            (slot) => slot._id.toString() === slotId
        );

        if (slotIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Slot not found",
            });
        }

        // Remove slot
        doctor.availableSlots.splice(slotIndex, 1);

        await doctor.save();

        res.status(200).json({
            success: true,
            message: "Slot deleted successfully",
            availableSlots: doctor.availableSlots,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDoctorDashboard = async (req, res) => {
    try {
        // Find logged-in doctor's profile
        const doctor = await Doctor.findOne({
            userId: req.user._id,
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Fetch all appointments
        const appointments = await Appointment.find({
            doctorId: doctor._id,
        })
            .populate("patientId", "name image")
            .sort({ appointmentDate: -1 });

        // Today's appointments
        const today = new Date().toISOString().split("T")[0];

        const todaysAppointments = appointments.filter(
            (a) =>
                new Date(a.appointmentDate)
                    .toISOString()
                    .split("T")[0] === today
        );

        // Unique patients
        const uniquePatients = new Set(
            appointments.map((a) => a.patientId._id.toString())
        );

        // Earnings (only completed appointments)
        const earnings = appointments
            .filter((a) => a.status === "Completed")
            .length * doctor.consultationFee;

        res.status(200).json({
            success: true,
            dashboard: {
                available: doctor.available,
                totalAppointments: appointments.length,
                todayAppointments: todaysAppointments.length,
                totalPatients: uniquePatients.size,
                earnings,
                recentAppointments: appointments.slice(0, 5),
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    updateAvailability,
    addAvailableSlot,
    getAvailableSlots,
    updateAvailableSlot,
    deleteAvailableSlot,
    getDoctorDashboard,
};