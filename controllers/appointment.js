const Appointment = require('../models/Appointment');

// @route   GET api/appointment 

// @desc    Get all appointments

// @access  Private

exports.getAppointments = async (req, res) => {
  
    try {
  
      const appointments = await Appointment.find().sort({ date: -1 });
  
      res.json(appointments);
  
    } catch (err) {
  
      console.error(err.message);
  
      res.status(500).send('Server Error');
  
    }
  
}

// @route   GET api/appointment/:id

// @desc    Get appointment by ID

// @access  Private

exports.getAppointmentById = async (req, res) => {

  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {

      return res.status(404).json({ msg: 'Appointment not found' });

    }

    res.json(appointment);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server Error');

  }

}

// @route   POST api/appointment

// @desc    Create or update appointment

// @access  Private

exports.createAppointment = async (req, res) => {

  const { doctor, time, date } = req.body;

  let appointmentFields = {};

  appointmentFields.user = req.user.id;

  if (doctor) appointmentFields.doctor = doctor;

  if (time) appointmentFields.time = time;

  if (date) appointmentFields.date = date;

  // Build appointment object

  try {
    let appointment = await Appointment.findOne({ doctor: doctor });

    if (appointment) {
      // Update
      appointment = await Appointment.findOneAndUpdate(
        { user: req.user.id },
        { $set: appointmentFields },
        { new: true }
      );

      return res.json(appointment);
    }

    // Create
    appointment = new Appointment(appointmentFields);

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// @route   DELETE api/appointment/:id

// @desc    Delete appointment

// @access  Private

exports.deleteAppointment = async (req, res) => {
  
    try {
  
      const appointment = await Appointment.findById(req.params.id);
  
      if (!appointment) {
  
        return res.status(404).json({ msg: 'Appointment not found' });
  
      }
  
      // Check user
  
      if (appointment.user.toString() !== req.user.id) {
  
        return res.status(401).json({ msg: 'User not authorized' });
  
      }
  
      await appointment.remove();
  
      res.json({ msg: 'Appointment removed' });
  
    } catch (err) {
  
      console.error(err.message);
  
      res.status(500).send('Server Error');
  
    }
  
  }

