const Login = require("../app/models/Login");
const User = require("../app/models/user");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../util/mongoos");

module.exports = {
  auth: (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        res.locals.currentUser = user;
        return next();
    }
    return res.redirect('/auth/login');
  },
};
