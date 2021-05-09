const Course = require("../../models/Cource");
const DetailCourse = require("../../models/DetailCourse");
const Request = require("../../models/Request");
const Studied = require("../../models/Studied");
const mongoose = require("mongoose");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

class ManageCourseController{
    async index(req, res, next) {
        const courses = await Course.find({});

        res.render('admin/home/home', {courses: mutipleMongooseToObject(courses)});
    }
}

module.exports = new ManageCourseController;