const express = require('express')
const router = express.Router()
const passport = require('passport')

const homeController = require('../../app/controllers/admin/HomeController');

router.get('/', homeController.index);

module.exports = router;
