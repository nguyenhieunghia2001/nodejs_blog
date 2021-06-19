// const Login = require("../models/Login");
const User = require("../../models/user");
const Login = require("../../models/Login");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

class ManageStudentController {
    async index(req, res, next) {
        const users = await User.find({});

        res.render('admin/student/homeStudent', {users: mutipleMongooseToObject(users), layout: 'admin', title: 'Student Admin'});
    }
    async addcourseIndex(req, res, next) {
        const users = await User.find({});

        res.render('admin/student/updateStudent', {users: mutipleMongooseToObject(users), layout: 'admin', title: 'Student Admin'});
    }
    async addcourse(req, res, next) {
        const users = await User.find({});

        res.render('admin/student/', {users: mutipleMongooseToObject(users), layout: 'admin', title: 'Student Admin'});
    }

    async delstudent(req, res, next ){
        const { id } = req.params;

        const user = await User.findOne({ _id: id });

        await Login.deleteOne({ email: user.email })
        await User.deleteOne({ _id: id})

        res.redirect('../../adminstudent')
    }
}

module.exports = new ManageStudentController;