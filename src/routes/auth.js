const express = require('express')
const router = express.Router()
const { passport } = require('../config/service/passport');

// const homeController = require('../app/controller/HomeController');
// router.use('/home', homeController.index);
const authController = require('../app/controllers/AuthController');

router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/register', authController.register);
router.post('/register', authController.createAccount);
router.get('/active', authController.active);
router.get('/logout', authController.logout);

//#FACEBOOK
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback',
    (req, res, next) => {
        passport.authenticate('facebook', (error, profile, info) => {
            // console.log(profile);
            req.session.emailUser = profile.email;
            res.redirect('../../');
            // next();
        })(req, res, next);
    })

//GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (error, profile, info) => {
            // console.log(profile);
            req.session.emailUser = profile.email;
            res.redirect('../../');
            // next();
        })(req, res, next);
    })

module.exports = router;
