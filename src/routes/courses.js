const express = require('express')
const router = express.Router()

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const courseController = require('../app/controllers/CourseController');
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.index);

module.exports = router;
