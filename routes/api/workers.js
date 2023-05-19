const { check, validationResult } = require('express-validator');
const controller = require('../../controllers/workers')

const router = require('express').Router()

router.get('/', controller.getAllWorkers)

router.get('/:id', controller.getWorkerById)

router.post('/',
[
  check('fullName', 'Name is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  check('phone', 'phone is required').not().isEmpty(),

], controller.newWorker)

router.put('/:id', controller.updateWorker)

router.delete('/:id', controller.deleteWorker)

module.exports = router