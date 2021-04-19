const express = require('express')
const router = express.Router()
const passport = require('passport')

const manageStudentController = require('../../app/controllers/admin/ManageStudentController');

router.get('/', manageStudentController.index);

module.exports = router;
