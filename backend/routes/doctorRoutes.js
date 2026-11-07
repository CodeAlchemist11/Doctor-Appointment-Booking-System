const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
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
} = require("../controllers/doctorController");
const { protect, authorize } = require("../middleware/authMiddleware");

//Doctor Routes
router.put(
    "/availability",
    protect,
    authorize("doctor"),
    updateAvailability
);

router.post(
    "/slots",
    protect,
    authorize("doctor"),
    addAvailableSlot
);

router.get(
    "/slots",
    protect,
    authorize("doctor"),
    getAvailableSlots
);

router.put(//6a6486a85f5b731219e1bd4b,  6a63952c67bb321e0655bfc9
    "/slots/:slotId",
    protect,
    authorize("doctor"),
    updateAvailableSlot
);

router.delete(
    "/slots/:slotId",
    protect,
    authorize("doctor"),
    deleteAvailableSlot
);

// Public Routes
router.get(
    "/",
    protect,
    getAllDoctors
);

router.get(
    "/dashboard",
    protect,
    authorize("doctor"),
    getDoctorDashboard
);

router.get(
    "/:id",
    protect,
    getDoctorById
);

// Admin Routes
router.post(
    "/",
    protect,
    authorize("admin"),
    upload.single("image"),
    addDoctor
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateDoctor
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteDoctor
);



module.exports = router;