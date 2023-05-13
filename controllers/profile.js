const { validationResult } = require("express-validator");
const config = require("config");
const request = require("request");
const Profile = require("../models/insulinProfile");
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    console.log(req.user);
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
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
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "avatar",
    ]);
    
    if (!profiles) return res.status(404).json("profiles not found");
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
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
exports.newProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const existingProfile = await Profile.findOne({ user: req.user.id });
    if (existingProfile)
      return res.status(400).json("user profile already created");
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

    const profile = await new Profile(profileFields);

    profile.save();

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

