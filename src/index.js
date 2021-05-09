const express = require('express')
const handlebars = require('express-handlebars');
const app = express()
const port = 8888
const path = require('path');
const authMiddleware = require('./middlewares/auth')
const cookieSession = require('express-session')
const route = require('./routes');
const db = require('./config/database')
const cookieParser = require('cookie-parser')
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./config');

const handlebars_hp = require('handlebars');
const helpers = require('handlebars-helpers')({
  handlebars: handlebars_hp
});

//connect db
db.connect();

app.use(cookieSession({
  name: 'session',
  keys: ['screct'],
  secret: 'somevalue',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(authMiddleware);

//cookie parser
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


var hbs = handlebars.create({
  helpers: {
    if_equal: (a, b, opts) => a == b ? opts.fn(this)  : opts.inverse(this),
    sum: (value) => value + 1,
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));

// console.log(path.join(__dirname, 'resource', 'views'));
//passport
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(accessToken, refreshToken, profile, done);
      return done(null, profile);
    });
  }
));
app.use(passport.initialize());
app.use(passport.session());

//route init
route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})