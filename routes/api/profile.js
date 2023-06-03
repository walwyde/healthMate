const express = require("express")
const { check } = require("express-validator")
const router = express.Router()
const controller = require("../../controllers/profile")
const mdlwre = require("../../middleware/index")


// router.get('/users', controller.getAllProfiles)
router.get("/me", mdlwre.auth, controller.getProfile)

router.get('/:id', mdlwre.auth, controller.getProfileById)

router.post('/me/availability', mdlwre.auth, [
  check('day', 'input available Day').not().isEmpty(),
  check('time', 'please include time of day').not().isEmpty()
], controller.updateAvailability)

router.delete('/me/availability', mdlwre.auth, controller.clearAvailability)

router.post('/me',mdlwre.auth, 
[
  check("age", "You Must Belong To An Age Bracket For Better Diagnosis").not().isEmpty(),
], 
controller.newProfileCard)

router.put('/me', mdlwre.auth, controller.updateProfileCard) 

router.delete('/me', mdlwre.auth, controller.deleteUserProfile)



module.exports = router