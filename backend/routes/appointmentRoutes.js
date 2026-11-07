const express = require("express");
const router = express.Router();

const {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    cancelAppointment,
} = require("../controllers/appointmentController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Book Appointment
router.post(
    "/",
    protect,
    authorize("patient"),
    bookAppointment
);

// Get My Appointments
router.get(
    "/my",
    protect,
    authorize("patient"),
    getMyAppointments
);

router.get(
    "/doctor",
    protect,
    authorize("doctor"),
    getDoctorAppointments
);

router.put(
    "/:id/status",
    protect,
    authorize("doctor"),
    updateAppointmentStatus
);

router.put(
    "/:id/cancel",
    protect,
    authorize("patient"),
    cancelAppointment
);

module.exports = router;