const Worker = require("../models/HealthWorker");

const { validationResult } = require("express-validator");

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();

    if (!workers) return res.status(404).json({ message: "workers not found" });

    res.status(200).json(workers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

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
};

exports.getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) return res.status(404).json({ message: "worker not found" });
    res.status(200).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.newWorker = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName,
    dateOfBirth,
    gender,
    address,
    identificationNumber,
    institution,
    degree,
    year,
    specialization,
    professionalDesignation,
    licenseNumber,
    organization,
    email,
    organizationContact,
    employer,
    position,
    startDate,
    password,
    endDate,
    languages,
    skills,
    areasOfExpertise,
    role,
    phone,
  } = req.body;

  try {

    const profileFields = {};
    profileFields.user = req.user.id;
    if (fullName) profileFields.fullName = fullName;
    if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
    if(gender) profileFields.gender = gender
    if(address) profileFields.address = address
    if(identificationNumber) profileFields.identificationNumber = identificationNumber
    if(institution) profileFields.institution = institution
    if(degree) profileFields.degree = degree
    if(year) profileFields.year = year
    if(specialization) profileFields.specialization = specialization
    if(professionalDesignation) profileFields.professionalDesignation = professionalDesignation
    if(licenseNumber) profileFields.licenseNumber = licenseNumber
    if(organization) profileFields.organization = organization
    if(email) profileFields.email = email
    if(organizationContact) profileFields.organizationContact = organizationContact
    if(employer) profileFields.employer = employer
    if(position) profileFields.position = position
    if(startDate) profileFields.startDate = startDate
    if(endDate) profileFields.endDate = endDate
    if(languages) profileFields.languages = languages.split(',').map(skill => skill.trim())
    if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim())
    if(areasOfExpertise) profileFields.areasOfExpertise = areasOfExpertise
    if(role) profileFields.role = role
    if(phone) profileFields.phone = phone

    const worker = new Worker(profileFields);

    await worker.save();
    if (!worker) return res.status(404).json({ message: "worker not Registered" });
    res.status(201).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", });
  }
};

exports.updateWorker = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName,
    dateOfBirth,
    gender,
    address,
    identificationNumber,
    institution,
    degree,
    year,
    specialization,
    professionalDesignation,
    licenseNumber,
    organization,
    email,
    organizationContact,
    employer,
    position,
    startDate,
    password,
    endDate,
    languages,
    skills,
    areasOfExpertise,
    role,
    phone,
  } = req.body;

  try {

    const profileFields = {};
    profileFields.user = req.user.id;
    if (fullName) profileFields.fullName = fullName;
    if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
    if(gender) profileFields.gender = gender
    if(address) profileFields.address = address
    if(identificationNumber) profileFields.identificationNumber = identificationNumber
    if(institution) profileFields.institution = institution
    if(degree) profileFields.degree = degree
    if(year) profileFields.year = year
    if(specialization) profileFields.specialization = specialization
    if(professionalDesignation) profileFields.professionalDesignation = professionalDesignation
    if(licenseNumber) profileFields.licenseNumber = licenseNumber
    if(organization) profileFields.organization = organization
    if(email) profileFields.email = email
    if(organizationContact) profileFields.organizationContact = organizationContact
    if(employer) profileFields.employer = employer
    if(position) profileFields.position = position
    if(startDate) profileFields.startDate = startDate
    if(endDate) profileFields.endDate = endDate
    if(languages) profileFields.languages = languages.split(',').map(skill => skill.trim())
    if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim())
    if(areasOfExpertise) profileFields.areasOfExpertise = areasOfExpertise
    if(role) profileFields.role = role
    if(phone) profileFields.phone = phone

    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { $set: profileFields },
      { new: true }
    );

    if (!worker) return res.status(404).json({ message: "worker not found" });

    await worker.save();

    res.status(201).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteWorker = async (req, res) => {
  try {


    await Worker.findByByIdAndRemove(req.params.id);

    res.status(200).json({ message: "worker deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
