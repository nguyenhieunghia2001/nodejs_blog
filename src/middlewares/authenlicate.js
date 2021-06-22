const Login = require("../app/models/Login");
const User = require("../app/models/user");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../util/mongoos");

module.exports = {
  isAuth: (req, res, next) => {
    const { emailUser } = req.session;
    if (emailUser) {
        // const user = req.user;
        // res.locals.currentUser = user;
        return next();
    }
    return res.redirect('/auth/login');
  },
};
