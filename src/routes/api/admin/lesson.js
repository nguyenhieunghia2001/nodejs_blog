const express = require('express')
const router = express.Router()

const lessonAPI = require('../../../app/api/admin/lesson');

//[GET]
router.get('/add', lessonAPI.addLesson);
router.get('/getlesson', lessonAPI.getLesson);
router.get('/update', lessonAPI.updateLesson);

module.exports = router;