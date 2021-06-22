const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const manageCourseController = require('../../app/controllers/admin/ManageCourseController');

router.get('/', manageCourseController.index);

router.get('/addcourse', manageCourseController.addcourseIndex);
router.post('/addcourse', upload.single('image'), manageCourseController.addcourse);

router.get('/updatecourse/:id', manageCourseController.updatecourseIndex);
router.post('/updatecourse/:id', upload.single('image'), manageCourseController.updatecourse);

router.get('/lesson', manageCourseController.lesson);

router.get('/delcourse/:id', manageCourseController.delcourse);

module.exports = router;
