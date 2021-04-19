const express = require('express')
const router = express.Router()
const passport = require('passport')

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const authController = require('../app/controllers/AuthController');

router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/register', authController.register);
router.post('/register', authController.createAccount);
router.get('/logout', authController.logout);

//passprot
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
    authController.callbackfb);

module.exports = router;
