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


exports.newProfileCard = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {diabetic, hypertensive} = req.user.condition
  try {
    let existingProfile;
     if (diabetic)  existingProfile = await InsulinProfile.findOne({ user: req.user.id });
      if (hypertensive) existingProfile = await BpProfileCard.findOne({ user: req.user.id });

    if (existingProfile)
      return res.status(400).json("user profile already created");
    const {
     
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (experience) profileFields.experience = experience;
    if (education) profileFields.education = education;

   let profile;
if (diabetic) profile = await new InsulinProfile(profileFields);
 if(hypertensive)  profile = await new Profile(profileFields);

    // profile.save();

    res.status(201).json(profile);
  } catch (err) {
    console.log(err);
  }
};

exports.editProfile = async (req, res) => {
  console.log(req.body);
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    experience,
    education,
  } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (skills)
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (experience) profileFields.experience = experience;
  if (education) profileFields.education = education;

  const { youtube, twitter, facebook, linkedin, instagram } = req.body;
  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields }
      );
    }
    res.status(201).json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json("profile deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// Create a new profileCard
exports.newBPCard = async (req, res) => {
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
  } = req.body; // Get the form data from the request body

  try {
    // Create a new ProfileCard document using the form data
    const profileCard = new BpProfileCard({
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
    });

    // Save the ProfileCard document to the database
    await profileCard.save();

    res
      .status(201)
      .json({ message: "Profile created successfully", profileCard });
  } catch (error) {
    res.status(500).json({ message: "Could not create profile", error });
  }
};
