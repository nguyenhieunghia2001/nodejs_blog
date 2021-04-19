const express = require('express')
const router = express.Router()
const passport = require('passport')

const manageCourseController = require('../../app/controllers/admin/ManageCourseController');

router.get('/', manageCourseController.index);
router.post('/', manageCourseController.createCourse);

module.exports = router;
