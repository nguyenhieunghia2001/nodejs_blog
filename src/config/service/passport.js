const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../app/models/user');

exports.InitPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email'],
    }, async function (accessToken, refreshToken, profile, done) {
        let userEmail = profile?.emails[0]?.value;
        let user = await User.findOne({ email: userEmail });
        if (!user) {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: userEmail,
                username: profile.displayName,
                facebookId: profile.id,
            });
            await user.save();
        } else if (!user.facebookId && user.email === userEmail) {
            user.facebookId = profile.id;
            await user.save();
        }

        return done(null, user);
    }));

    //GOOGLE
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, async function (accessToken, refreshToken, profile, done) {
        let userEmail = profile?.emails[0]?.value;
        let user = await User.findOne({ email: userEmail });
        if (!user) {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: userEmail,
                username: profile.displayName,
                googleId: profile.id,
            });
            await user.save();
        } else if (!user.googleId && user.email === userEmail) {
            user.googleId = profile.id;
            await user.save();
        }

        return done(null, user);
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (_id, done) {
        try {
            // let user = await User.findByPk(id);
            let user = await User.findOne({ _id });
            done(null, user);
        } catch (error) {
            return done(err);
        }
    });
};
//passport

exports.passport = passport;