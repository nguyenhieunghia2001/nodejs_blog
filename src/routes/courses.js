const express = require('express')
const router = express.Router()

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const courseController = require('../app/controllers/CourseController');
const detailCourseController = require('../app/controllers/DetailCourseController');

router.get('/', courseController.home);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/video/:slug/:idvideo', detailCourseController.index);
router.get('/:slug', courseController.index);

module.exports = router;
