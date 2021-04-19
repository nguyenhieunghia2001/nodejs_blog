// const Login = require("../models/Login");
const User = require("../../models/user");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

class ManageStudentController {
    async index(req, res, next) {
        const users = await User.find({});

        res.render('admin/manageStudent', {users: mutipleMongooseToObject(users)});
    }
}

module.exports = new ManageStudentController;