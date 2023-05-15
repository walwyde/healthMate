const Worker = require('../models/HealthWorker');

const { validationResult } = require('express-validator');

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();

    if (!workers) return res.status(404).json({ message: "workers not found" });


    res.status(200).json(workers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

exports.getWorker = async (req, res) => {
  try {

    const worker = await Worker.findById(req.user.id);

    if (!worker) return res.status(404).json({ message: "worker not found" });

    res.status(200).json(worker);

  } catch (err) {

    if (err.kind == "ObjectId") {
      res.json({ msg: "worker not found" });
    }

    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

exports.getWorkerById = async (req, res) => {


  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) return res.status(404).json({ message: "worker not found" });
    res.status(200).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

exports.newWorker = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { name, email, password, role, phone } = req.body;

  try {
    const worker = new Worker({
      name,
      email,
      password,
      role,
      phone,
    });

    await worker.save();
    res.status(201).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

exports.updateWorker = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }


  const { name, email, password, role, phone } = req.body;

  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) return res.status(404).json({ message: "worker not found" });

    worker.name = name;
    worker.email = email;
    worker.password = password;
    worker.role = role;
    worker.phone = phone;

    await worker.save();
    res.status(201).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

exports.deleteWorker = async (req, res) => {


  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) return res.status(404).json({ message: "worker not found" });

    await worker.remove();
    res.status(200).json({ message: "worker deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}





