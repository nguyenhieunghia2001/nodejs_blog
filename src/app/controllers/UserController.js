const User = require("../models/user");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoos");

//hash
const bcrypt = require("bcrypt");
const { json, response } = require("express");
const saltRounds = 10;

class UserController {
  index(req, res, next) {
    // console.log(res.locals.currentUser.email);
    User.findOne({ email: res.locals.currentUser.email })
      .then(user => {
        return res.render('user/account', { user: mongooseToObject(user) })
      })
      .catch()
  }
  update(req, res, next) {
    const formData = req.body;

    User.updateOne({ email: res.locals.currentUser.email }, formData)
      .then(nRow => {
        return res.status(200).json(formData);
      })
      .catch(() => {
        return res.status(400).json(formData);
      })

  }
  updatePassword(req, res, next) {
    const formData = req.body;

    User.findOne({ email: res.locals.currentUser.email })
      .then(user => {
        bcrypt.compare(formData.oldPass, user.password, function (err, result) {
          if (!result) {
            return res.status(400).json(formData);
          }
          //update
          bcrypt.hash(formData.newPass, saltRounds, function (err, passHashed) {

            User.updateOne({ email: user.email }, { password: passHashed })
              .then(() => {
                return res.status(200).json(formData);
              })
              .catch(() => {
                return res.status(400).json(formData);
              })

          });
        })
      })
      .catch(() => {
        return res.status(400).json(formData);
      })
  }
}

module.exports = new UserController();
