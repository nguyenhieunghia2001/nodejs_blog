// const Login = require("../models/Login");
const User = require("../../models/user");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

class ManageStudentController {
    async index(req, res, next) {
        const users = await User.find({});

        res.render('admin/student/homeStudent', {users: mutipleMongooseToObject(users), layout: 'admin', title: 'Student Admin'});
    }
    async updateGet(req, res, next) {
        const { id } = req.params;
        const user = await User.findOne({ _id: id});

        res.render('admin/student/updateStudent', {user: mongooseToObject(user), layout: 'admin', title: 'Student Admin'});
    }
    async updatePost(req, res, next) {
        const { id } = req.params;
        const { username, gender } = req.body;

        const user = await User.findOne({ _id: id});
        if(user){
            user.username = username;
            user.gender = gender;
            user.save();
        }
        res.redirect('../../adminstudent');
    }

    async delstudent(req, res, next ){
        const { id } = req.params;

        const user = await User.findOne({ _id: id });

        await User.deleteOne({ _id: id})

        res.redirect('../../adminstudent')
    }
}

module.exports = new ManageStudentController;