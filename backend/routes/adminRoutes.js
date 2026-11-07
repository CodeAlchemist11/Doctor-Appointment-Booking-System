const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getAllPatients,
    getAllDoctors,
    getAllAppointments,
    deletePatient,
    deleteDoctor,
    searchPatients,
    searchDoctors,
} = require("../controllers/adminController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Admin Dashboard
router.get(
    "/dashboard",
    protect,
    authorize("admin"),
    getDashboard
);

// Get all patients
router.get(
    "/patients",
    protect,
    authorize("admin"),
    getAllPatients
);

// Delete Patient
router.delete(
    "/patients/:id",
    protect,
    authorize("admin"),
    deletePatient
);

// Get All Doctors
router.get(
    "/doctors",
    protect,
    authorize("admin"),
    getAllDoctors
);

router.delete(
    "/doctors/:id",
    protect,
    authorize("admin"),
    deleteDoctor
);

// Get All Appointments
router.get(
    "/appointments",
    protect,
    authorize("admin"),
    getAllAppointments
);

// Search Patients
router.get(
    "/patients/search",
    protect,
    authorize("admin"),
    searchPatients
);

// Search Doctors
router.get(
    "/doctors/search",
    protect,
    authorize("admin"),
    searchDoctors
);

module.exports = router;