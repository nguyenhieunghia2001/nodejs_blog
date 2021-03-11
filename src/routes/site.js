const express = require('express')
const router = express.Router()

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const siteController = require('../app/controllers/SiteController');
router.get('/', siteController.index);

module.exports = router;
