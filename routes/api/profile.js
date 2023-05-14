const express = require("express")
const { check } = require("express-validator")
const router = express.Router()
const controller = require("../../controllers/profile")
const mdlwre = require("../../middleware/index")


// router.get('/users', controller.getAllProfiles)

router.get('/user/:id', controller.getProfileById)

router.get("/me", mdlwre.auth, controller.getProfile)

router.post('/me/',mdlwre.auth, 
[
  check("status", "what is your employment status?").not().isEmpty(),
  check("skills", "please provide your skills information").not().isEmpty()
], 
controller.newBPCard)

router.put('/me', mdlwre.auth, controller.editProfile)


router.delete('/me', mdlwre.auth, controller.deleteUserProfile)

module.exports = router