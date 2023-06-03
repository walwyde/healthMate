const express = require("express");
const router = express.Router();
const auth = require("../../middleware/index");
const controller = require("../../controllers/appointment");

// @route   GET api/appointment
// @desc    Get all appointments
// @access  Private
router.get("/", auth.auth, controller.getAppointments);

router.get('/doctors', controller.getDoctors)


// @route   GET api/appointment/:id
// @desc    Get appointment by ID
// @access  Private
router.get("/:id", auth.auth, controller.getAppointmentById);

// @route   POST api/appointment
// @desc    Create or update appointment
// @access  Private
router.post("/", auth.auth, controller.createAppointment);

// @route   DELETE api/appointment/:id
// @desc    Delete appointment
// @access  Private
router.delete("/:id", auth.auth, controller.deleteAppointment);



module.exports = router;
