const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const getDashboard = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({
            role: "patient",
        });

        const totalDoctors = await Doctor.countDocuments();

        const totalAppointments = await Appointment.countDocuments();

        const pendingAppointments = await Appointment.countDocuments({
            status: "Pending",
        });

        const confirmedAppointments = await Appointment.countDocuments({
            status: "Confirmed",
        });

        const completedAppointments = await Appointment.countDocuments({
            status: "Completed",
        });

        const cancelledAppointments = await Appointment.countDocuments({
            status: "Cancelled",
        });

        res.status(200).json({
            success: true,
            dashboard: {
                totalPatients,
                totalDoctors,
                totalAppointments,
                pendingAppointments,
                confirmedAppointments,
                completedAppointments,
                cancelledAppointments,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({
            role: "patient",
        }).select("-password");

        res.status(200).json({
            success: true,
            count: patients.length,
            patients,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate("userId", "-password")
            .sort({ createdAt: -1 });

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

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patientId", "name email phone")
            .populate({
                path: "doctorId",
                populate: {
                    path: "userId",
                    select: "name email phone",
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

const deletePatient = async (req, res) => {
    try {
        const patient = await User.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        if (patient.role !== "patient") {
            return res.status(400).json({
                success: false,
                message: "User is not a patient",
            });
        }

        // Delete all appointments of this patient
        await Appointment.deleteMany({
            patientId: patient._id,
        });

        // Delete patient account
        await User.findByIdAndDelete(patient._id);

        res.status(200).json({
            success: true,
            message: "Patient deleted successfully",
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
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Delete all appointments of this doctor
        await Appointment.deleteMany({
            doctorId: doctor._id,
        });

        // Delete linked user account
        await User.findByIdAndDelete(doctor.userId);

        // Delete doctor profile
        await Doctor.findByIdAndDelete(doctor._id);

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

const searchPatients = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const patients = await User.find({
            role: "patient",
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { phone: { $regex: keyword, $options: "i" } },
            ],
        }).select("-password");

        res.status(200).json({
            success: true,
            count: patients.length,
            patients,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const searchDoctors = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const doctors = await Doctor.find({
            $or: [
                { specialization: { $regex: keyword, $options: "i" } },
                { hospital: { $regex: keyword, $options: "i" } },
            ],
        })
            .populate("userId", "name email phone")
            .sort({ createdAt: -1 });

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

module.exports = {
    getDashboard,
    getAllPatients,
    getAllDoctors,
    getAllAppointments,
    deletePatient,
    deleteDoctor,
    searchPatients,
    searchDoctors,
};