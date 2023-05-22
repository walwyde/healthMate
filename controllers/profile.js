const { validationResult } = require("express-validator");
const config = require("config");
const request = require("request");
const InsulinProfile = require("../models/InsulinProfile");
const BpProfileCard = require("../models/BpProfile"); // Import the ProfileCard model
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const { diabetic, hypertensive } = req.user.condition;

    let profile;

    if (diabetic)
      profile = await InsulinProfile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

    if (hypertensive)
      profile = await BpProfileCard.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .send({ messsge: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "server error" });
    console.log(err);
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) return res.json("user not found");
    res.status(200).json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.json({ msg: "user not found" });
    }
    console.log(error.message);
  }
};

// Create a new profileCard

exports.newProfileCard = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { diabetic, hypertensive } = req.user.condition;
  try {
    
    if (diabetic) {
      const {
        age,
        contactInfo,
        diagnosisDate,
        typeOfDiabetes,
        medications,
        allergies,
        emergencyContact,
        glucoseReadings,
        insulinDose,
        complications,
        doctor
      } = req.body;


      const existingProfile = await InsulinProfile.findOne({
        user: req.user.id,
      });

      if (existingProfile)
        return res.status(400).json("user profile already created");

      const profileFields = {};

      profileFields.user = req.user.id;

      if (age) profileFields.age = age;
      if (contactInfo) profileFields.contactInfo = contactInfo;
      if (diagnosisDate) profileFields.diagnosisDate = diagnosisDate;
      if (typeOfDiabetes) profileFields.typeOfDiabetes = typeOfDiabetes;
      if (medications) profileFields.medications = medications;
      if (allergies) profileFields.allergies = allergies;
      if (emergencyContact) profileFields.emergencyContact = emergencyContact;
      if (glucoseReadings) profileFields.glucoseReadings = glucoseReadings;
      if (insulinDose) profileFields.insulinDose = insulinDose;
      if (complications) profileFields.complications = complications;
      if (doctor) profileFields.doctor = doctor;

      const profile = new InsulinProfile(profileFields);


      if (!profile) return res.status(400).json("user profile not created");

      await profile.save();

      return res.status(200).json(profile);

    }

    if (hypertensive) {
      const {
        name,
        age,
        gender,
        phone,
        email,
        systolic,
        diastolic,
        medications,
        lifestyleModifications,
        otherHealthConditions,
        familyHistory,
        allergies,
        emergencyContact,
      } = req.body;

      const existingProfile = await BpProfileCard.findOne({
        user: req.user.id,
      });

      if (existingProfile)
        return res.status(400).json("user profile already created");

      const profileFields = {};

      profileFields.user = req.user.id;

      if (name) profileFields.name = name;
      if (age) profileFields.age = age;
      if (gender) profileFields.gender = gender;
      if (phone) profileFields.phone = phone;
      if (medications) profileFields.medications = medications;
      if (email) profileFields.email = email;
      if (diastolic) profileFields.diastolic = diastolic;
      if (systolic) profileFields.systolic = systolic;
      if (lifestyleModifications)
        profileFields.lifestyleModifications = lifestyleModifications;
      if (otherHealthConditions)
        profileFields.otherHealthConditions = otherHealthConditions;
      if (familyHistory) profileFields.familyHistory = familyHistory;
      if (allergies) profileFields.allergies = allergies;
      if (emergencyContact) profileFields.emergencyContact = emergencyContact;

      const profile = new BpProfileCard(profileFields);

      if (!profile) return res.status(400).json("user profile not created");

      await profile.save();

      res.status(201).json(profile);
    }
  } catch (err) {
    if (err.kind == "ObjectId") {
      res.json({ msg: "user not found" });
    }
    res.status(500).json({ message: "server error" });

    console.log(err);
  }
};

exports.updateProfileCard = async (req, res) => {
  const { diabetic, hypertensive } = req.user.condition;
  try {
    
    if (diabetic) {

    const {
      age,
      contactInfo,
      diagnosisDate,
      typeOfDiabetes,
      medications,
      allergies,
      emergencyContact,
      glucoseReadings,
      insulinDose,
      complications,
      doctor,
      name
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (age) profileFields.age = age;
    if (contactInfo) profileFields.contactInfo = contactInfo;
    if (diagnosisDate) profileFields.diagnosisDate = diagnosisDate;
    if (typeOfDiabetes) profileFields.typeOfDiabetes = typeOfDiabetes;
    if (medications) profileFields.medications = medications;
    if (allergies) profileFields.allergies = allergies;
    if (emergencyContact) profileFields.emergencyContact = emergencyContact;
    if (glucoseReadings) profileFields.glucoseReadings = glucoseReadings;
    if (insulinDose) profileFields.insulinDose = insulinDose;
    if (complications) profileFields.complications = complications;
    if (doctor) profileFields.doctor = doctor;
    if (name) profileFields.name = name;

    const profile = await InsulinProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    // profile.save();

    return res.status(201).json(profile);

  }

  if (hypertensive) {
    const {
      name,
        age,
        gender,
        phone,
        email,
        systolic,
        diastolic,
        medications,
        lifestyleModifications,
        otherHealthConditions,
        familyHistory,
        allergies,
        emergencyContact,
    } = req.body;


    const profileFields = {};

    profileFields.user = req.user.id;

    if (name) profileFields.name = name;
    if (age) profileFields.age = age;
    if(gender) profileFields.genger = gender;
    if (phone) profileFields.phone = phone;
    if (medications) profileFields.medications = medications;
    if (email) profileFields.email = email;
    if (diastolic) profileFields.diastolic = diastolic;
    if (systolic) profileFields.systolic = systolic;
    if (lifestyleModifications)

      profileFields.lifestyleModifications = lifestyleModifications;
    if (otherHealthConditions)
      profileFields.otherHealthConditions = otherHealthConditions;
    if (familyHistory) profileFields.familyHistory = familyHistory;
    if (allergies) profileFields.allergies = allergies;
    if (emergencyContact) profileFields.emergencyContact = emergencyContact;

    const profile = await BpProfileCard.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true}
    );

    // profile.save();

    res.status(201).json(profile);
  }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {

    if (!req.user) return res.status(400).json("user not found"
    );

    const { diabetic, hypertensive } = req.user.condition;

    if (diabetic) await InsulinProfile.findOneAndRemove({ user: req.user.id });

    if (hypertensive)
      await BpProfileCard.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json("profile deleted");

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

