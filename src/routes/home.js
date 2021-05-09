const express = require('express')
const router = express.Router()

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const homeController = require('../app/controllers/HomeController');

//[GET] picture
router.get('/picture/:id', homeController.picture);
router.get('/', homeController.index);

module.exports = router;
