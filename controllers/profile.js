const { validationResult } = require("express-validator");
const config = require("config");
const InsulinProfile = require("../models/InsulinProfile");
const BpProfileCard = require("../models/BpProfile"); // Import the ProfileCard model
const User = require("../models/User");

const HealthWorker = require("../models/HealthWorker");

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

    if (!diabetic && !hypertensive)
      profile = await HealthWorker.findOne({ user: req.user.id }).populate(
        "user",
        ["avatar"]
      );

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
    const { diabetic, hypertensive } = req.user.condition;

    const profile = diabetic
      ? await InsulinProfile.findOne({ user: req.params.id }).populate("user", [
          "condition",
          "avatar",
        ])
      : hypertensive
      ? await BpProfileCard.findOne({ user: req.params.id }).populate("user", [
          "avatar",
          "condition",
        ])
      : await HealthWorker.findOne({ user: req.user.id }).populate("user", [
          "avatar",
        ]);
    if (!profile) return res.json("user not found");
    res.status(200).json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.json(null);
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

    if (user.isStaff) {
      const existingProfile = await HealthWorker.findById(req.user.id);

      if (existingProfile)
        return res
          .status(400)
          .json({ error: { msg: "user profile already exists" } });

      const profileFields = {};
      const licenceDetails = {};
      const contactDetails = {};

      const {
        name,
        email,
        nin,
        phone,
        address,
        age,
        title,
        gender,
        licenceType,
        licenceNum,
        expiryDate,
        professionalDesignation,
      } = req.body;

      if (name) profileFields.name = name;
      if (nin) profileFields.nin = nin;
      if (age) profileFields.age = age;
      if (email) contactDetails.email = email;
      if (phone) contactDetails.phone = phone;
      if (address) contactDetails.address = address;
      profileFields.contactDetails = contactDetails;

      if (licenceType) licenceDetails.licenceType = licenceType;
      if (licenceNum) licenceDetails.licenceNum = licenceNum;

      if (expiryDate) licenceDetails.expiryDate = expiryDate;

      profileFields.licenceDetails = licenceDetails;

      if (title) profileFields.title = title;
      if (gender) profileFields.gender = gender;
      if (licenceDetails) profileFields.licenceDetails = licenceDetails;
      if (contactDetails) profileFields.contactDetails = contactDetails;
      if (professionalDesignation)
        profileFields.professionalDesignation = professionalDesignation;

      profileFields.user = req.user.id;

      const profile = new HealthWorker(profileFields);

      if (!profile)
        return res
          .status(400)
          .json({ errors: { msg: "profile could not be created" } });

      await profile.save();

      return res.status(200).json(profile);
    }

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
      if (phone) profileFields.phone = phone;
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
        avatar,
        name,
        age,
        gender,
        phone,
        address,
        email,
        bloodPressureReadings,
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
      if (address) profileFields.address = address;
      if (medications) profileFields.medications = medications;
      if (email) profileFields.email = email;
      if (bloodPressureReadings)
        profileFields.bloodPressureReadings = bloodPressureReadings;
      if (lifestyleModifications)
        profileFields.lifestyleModifications = lifestyleModifications;
      if (otherHealthConditions)
        profileFields.otherHealthConditions = otherHealthConditions;
      if (familyHistory) profileFields.familyHistory = familyHistory;
      if (allergies) profileFields.allergies = allergies;
      if (emergencyContact) profileFields.emergencyContact = emergencyContact;
      if (avatar) profileFields.avatar = avatar;

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
      if (phone) profileFields.phone = phone;
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

      const profile = await InsulinProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: false }
      );

      const userName =  await User.findOneAndUpdate({ _id: req.user.id }, { $set: { name: name } });

      if (!userName) return res.status(400).json("user name not updated");

      userName.save();

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

      const userName =  await User.findOneAndUpdate({ _id: req.user.id }, { $set: { name: name } });

      if (!userName) return res.status(400).json("user name not updated");

      userName.save();

      profile.save();

      res.status(201).json(profile);
    }

    // update staff profile

    const profileFields = {};
    const licenceDetails = {};
    const contactDetails = {};

    const {
      name,
      email,
      nin,
      phone,
      address,
      age,
      title,
      gender,
      licenceType,
      licenceNum,
      expiryDate,
      professionalDesignation,
    } = req.body;

    if (name) profileFields.name = name;
    if (nin) profileFields.nin = nin;
    if (age) profileFields.age = age;
    if (email) contactDetails.email = email;
    if (phone) contactDetails.phone = phone;
    if (address) contactDetails.address = address;
    profileFields.contactDetails = contactDetails;

    if (licenceType) licenceDetails.licenceType = licenceType;
    if (licenceNum) licenceDetails.licenceNum = licenceNum;

    if (expiryDate) licenceDetails.expiryDate = expiryDate;

    profileFields.licenceDetails = licenceDetails;

    if (title) profileFields.title = title;
    if (gender) profileFields.gender = gender;
    if (licenceDetails) profileFields.licenceDetails = licenceDetails;
    if (contactDetails) profileFields.contactDetails = contactDetails;
    if (professionalDesignation)
      profileFields.professionalDesignation = professionalDesignation;

    profileFields.user = req.user.id;

    const profile = await HealthWorker.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: false }
    );

    if (!profile)
      return res
        .status(400)
        .json({ errors: { msg: "profile could not be edited" } });

    await profile.save();

    const userName =  await User.findOneAndUpdate({ _id: req.user.id }, { $set: { name: name } });

    if (!userName) return res.status(400).json("user name not updated");

    userName.save();

    return res.status(200).json(profile);
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

exports.updateAvailability = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    const availability = { ...req.body};
    console.log(req.body)
    const profile = await HealthWorker.findOne({ user: req.user.id });

    if (!profile)
      return res.status(400).json({ errors: { msg: "profile not found" } });

    profile.availability.push(availability);

    await profile.save();

    res.json(profile.availability);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.clearAvailability = async (req, res) => {
  
  try {

    const profile = await HealthWorker.findOne({ user: req.user.id });

    if (!profile)
      return res.status(400).json({ errors: { msg: "profile not found" } });

    profile.availability = [];

    await profile.save();

    res.json(profile.availability);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};
