const { validationResult } = require("express-validator");
const config = require("config");
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
      }).populate("user", ["condition", "avatar"]);

    if (hypertensive)
      profile = await BpProfileCard.findOne({
        user: req.user.id,
      }).populate("user", ["condition", "avatar"]);

    if (!profile) {
      return res.status(400).json(null);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "server error" });
    console.log(err);
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { diabetic } = req.user.condition;

    const profile = diabetic
      ? await InsulinProfile.findOne({ user: req.params.id }).populate("user", [
          "condition",
          "avatar",
        ])
      : await BpProfileCard.findOne({ user: req.params.id }).populate("user", [
          "avatar",
          "condition",
        ]);
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

  try {
    const user = await User.findById(req.user.id);

    const { diabetic, hypertensive } = user.condition;

    if (diabetic) {
      const {
        name,
        address,
        age,
        phone,
        contactName,
        contactPhone,
        medName,
        medDose,
        frequency,
        diagnosisDate,
        typeOfDiabetes,
        allergies,
        insulinType,
        docName,
        docPhone,
        docEmail,
        readingDate,
        readingTime,
        glucoseLevel,
      } = req.body;

      const existingProfile = await InsulinProfile.findOne({
        user: req.user.id,
      });

      if (existingProfile)
        return res.status(400).json("user profile already created");

      const profileFields = {};
      const medications = [];
      let doctor = {};
      const insulinDose = [];
      const glucoseReadings = [];
      let emergencyContact = {};

      profileFields.user = req.user.id;

      if (name) profileFields.name = name;
      if (address) profileFields.address = address;
      if(phone) profileFields.phone = phone;
      if (age) profileFields.age = age;
      if (diagnosisDate) profileFields.diagnosisDate = diagnosisDate;
      if (typeOfDiabetes) profileFields.typeOfDiabetes = typeOfDiabetes;
      if (allergies) profileFields.allergies = allergies;
      if (emergencyContact) profileFields.emergencyContact = emergencyContact;
      if (insulinType)
        insulinDose.push({
          insulinType: insulinType,
        });
      profileFields.insulinDose = insulinDose;
      if (docName && docPhone)
        doctor = {
          docName: docName,
          docPhone: docPhone,
          docEmail: docEmail,
        };
      profileFields.doctor = doctor;
      if (contactName && contactPhone)
        emergencyContact = {
          contactName: contactName,
          contactPhone: contactPhone,
        };
      profileFields.emergencyContact = emergencyContact;

      if (medName && medDose && frequency) {
        medName.split(",").map((item, i) => {
          let obj = {
            medName: item,
            medDose: medDose.split(",")[i],
            frequency: frequency.split(",")[i],
          };

          medications.push(obj);
        });
      }
      profileFields.medications = medications;

      glucoseReadings.push({
        readingDate: readingDate,
        readingTime: readingTime,
        glucoseLevel: glucoseLevel,
      });

      profileFields.glucoseReadings = glucoseReadings;

      const profile = new InsulinProfile(profileFields);

      if (!profile) return res.status(400).json("user profile not created");

      console.log(`profileFields: ${profileFields}`);

      await profile.save();

      console.log(profile);

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

      if (!existingProfile)
        return res.status(400).json("user profile not found");

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

      if (!profile) return res.status(400).json("user profile not updated");

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
        name,
        address,
        age,
        phone,
        contactName,
        contactPhone,
        medName,
        medDose,
        frequency,
        diagnosisDate,
        typeOfDiabetes,
        allergies,
        insulinType,
        docName,
        docPhone,
        docEmail,
        readingDate,
        readingTime,
        glucoseLevel,
      } = req.body;

      const profileFields = {};
      const medications = [];
      let doctor = {};
      const insulinDose = [];
      const glucoseReadings = [];
      let emergencyContact = {};

      profileFields.user = req.user.id;

      if (name) profileFields.name = name;
      if (address) profileFields.address = address;
      if(phone) profileFields.phone = phone;
      if (age) profileFields.age = age;
      if (diagnosisDate) profileFields.diagnosisDate = diagnosisDate;
      if (typeOfDiabetes) profileFields.typeOfDiabetes = typeOfDiabetes;
      if (allergies) profileFields.allergies = allergies;
      if (emergencyContact) profileFields.emergencyContact = emergencyContact;
      if (insulinType)
        insulinDose.push({
          insulinType: insulinType,
        });
      profileFields.insulinDose = insulinDose;
      if (docName && docPhone)
        doctor = {
          docName: docName,
          docPhone: docPhone,
          docEmail: docEmail,
        };
      profileFields.doctor = doctor;
      if (contactName && contactPhone)
        emergencyContact = {
          contactName: contactName,
          contactPhone: contactPhone,
        };
      profileFields.emergencyContact = emergencyContact;

      if (medName && medDose && frequency) {
        medName.split(",").map((item, i) => {
          const obj = {
            "medName": item,
            "medDose": medDose.split(",")[i],
            "frequency": frequency.split(",")[i],
          };

          medications.push(obj);
        });
      }
      profileFields.medications = medications;

      glucoseReadings.push({
        readingDate: readingDate,
        readingTime: readingTime,
        glucoseLevel: glucoseLevel,
      });

      profileFields.glucoseReadings = glucoseReadings;

      const profile = await InsulinProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: false }
      );

      if (!profile) return res.status(400).json("user profile not updated");

      profile.save();

      return res.status(201).json(profile);
    }

    if (hypertensive) {
      const {
        name,
        age,
        gender,
        phone,
        email,
        address,
        bloodPressureReadings,
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
      if (gender) profileFields.genger = gender;
      if (phone) profileFields.phone = phone;
      if (medications) profileFields.medications = medications;
      if (email) profileFields.email = email;
      if (bloodPressureReadings)
        profileFields.bloodPressureReadings = bloodPressureReadings;
      if (address) profileFields.address = address;
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
        { new: false }
      );

      profile.save();

      res.status(201).json(profile);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(400).json("user not found");

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
