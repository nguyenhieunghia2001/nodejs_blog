const express = require('express')
const router = express.Router()

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const userController = require('../app/controllers/UserController');


router.post('/update', userController.update);
router.post('/updatePassword', userController.updatePassword);
router.get('/:id', userController.index);


module.exports = router;
