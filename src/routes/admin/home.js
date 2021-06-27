const express = require('express')
const router = express.Router()
const passport = require('passport')

const homeController = require('../../app/controllers/admin/HomeController');
const chartApiController = require('../../app/api/admin/chart');

router.get('/', homeController.index);

//API 
//#chart
router.get('/chart', chartApiController.getUserRegisterWithMonth);

module.exports = router;
