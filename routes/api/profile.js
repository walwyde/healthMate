const express = require("express")
const { check } = require("express-validator")
const router = express.Router()
const controller = require("../../controllers/profile")
const mdlwre = require("../../middleware/index")


// router.get('/users', controller.getAllProfiles)
router.get("/me", mdlwre.auth, controller.getProfile)

router.get('/:id', mdlwre.auth, controller.getProfileById)


router.post('/me',mdlwre.auth, 
[
  check("medications", "what is your current medication?").not().isEmpty(),
  check("age", "You Must Belong To An Age Bracket For Better Diagnosis").not().isEmpty(),
], 
controller.newProfileCard)

router.put('/me', mdlwre.auth, controller.updateProfileCard) 

router.delete('/me', mdlwre.auth, controller.deleteUserProfile)

module.exports = router