const Course = require("../../models/Cource");
const DetailCourse = require("../../models/DetailCourse");
const Request = require("../../models/Request");
const Studied = require("../../models/Studied");
const mongoose = require("mongoose");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

class ManageCourseController {
    async index(req, res, next) {
        const courses = await Course.find({});

        res.render('admin/course/home', { courses: mutipleMongooseToObject(courses) });
    }

    async addcourseIndex(req, res, next) {

        res.render('admin/course/addCourse');
    }

    async addcourse(req, res, next) {
        const { name, description, studied, request } = req.body;


        const course = new Course({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            description: description,
            name_request: name,
            img:{
                data: req.file.buffer,
                contentType: 'image/png'
            }
        });
        await course.save();

        let ReqList = [];
        request.forEach((r) => {
            ReqList.push({
                id_course: course._id,
                request: r,
            });
        });
        let StuList = [];
        studied.forEach((r) => {
            StuList.push({
                id_course: course._id,
                studied: r,
            });
        });

        await Request.insertMany(ReqList);
        await Studied.insertMany(StuList);

        res.redirect('../../admincourse');
        // res.json(req.file.buffer);
    }
    async updatecourseIndex(req, res, next) {
        const { id } = req.params;

        await Course.findOne({ _id: id })
            .then(async course => {

                const requests = await Request.find({ id_course: course._id });
                const studieds = await Studied.find({ id_course: course._id });

                return res.render('admin/course/updateCourse', {
                    course: mongooseToObject(course),
                    requests: mutipleMongooseToObject(requests),
                    studieds: mutipleMongooseToObject(studieds),
                });
            })
            .catch(() => {
                return res.render('admin/course/updateCourse', { course: null });
            })

    }

    async updatecourse(req, res, next) {
        const { name, description, studied, request } = req.body;
        const { id } = req.params;

        await Course.updateOne({ _id: id }, { img: { data: req.file.buffer, contentType: 'image/png' },
                                              name: name,  
                                              description: description,
                                            })
              .then(() => {
                res.redirect('admincourse');
              })
              .catch(() => {
                res.redirect('admincourse');
              })
              
        res.redirect('admincourse');
    }

    async delcourse(req, res, next){
        const { id } = req.params;
        // res.redirect('../../admincourse')
        await Course.deleteOne({ _id: id})
                .then(() => res.redirect('../../admincourse'))
                .catch (next())
    }
}

module.exports = new ManageCourseController();
