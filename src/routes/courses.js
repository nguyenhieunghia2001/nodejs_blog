const express = require('express')
const router = express.Router()
const { isAuth } = require("../middlewares/authenlicate");
// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const courseController = require('../app/controllers/CourseController');
const detailCourseController = require('../app/controllers/DetailCourseController');

router.get('/', courseController.home);
router.get('/register/:idcourse', isAuth, courseController.register);
router.post('/store', courseController.store);
router.get('/video', isAuth, detailCourseController.index);
router.get('/:slug', courseController.detail);

module.exports = router;
