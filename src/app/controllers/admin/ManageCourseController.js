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

        res.render('admin/course/home', { courses: mutipleMongooseToObject(courses), layout: 'admin', title: 'Courses Admin' });
    }

    async addcourseIndex(req, res, next) {

        res.render('admin/course/addCourse', {layout: 'admin', title: 'Courses Admin'});
    }

    async addcourse(req, res, next) {
        const { name, description, studied, request, video } = req.body;

        //thêm khóa học
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

        //lấy danh sách yêu cầu để add
        let ReqList = [];
        request.forEach((r) => {
            ReqList.push({
                id_course: course._id,
                request: r,
            });
        });

        //lấy danh sách sẽ học được gì để add
        let StuList = [];
        studied.forEach((r) => {
            StuList.push({
                id_course: course._id,
                studied: r,
            });
        });

        const requestInsert = await Request.insertMany(ReqList);
        const studiedInsert = await Studied.insertMany(StuList);

        // //cập nhật lại id studied và request cho Collection Course
        // Course.findOneAndUpdate(
        //     {_id: course._id},
        //     {
        //         $push: { _idCourse: course._id },
        //     }
        // )

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
                    layout: 'admin',
                    title: 'Courses Admin'
                });
            })
            .catch(() => {
                return res.render('admin/course/updateCourse', { course: null, layout: 'admin', title: 'Courses Admin' });
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
                .catch (next)
    }
    
    async lesson(req, res, next){
        const { courseid } = req.query;

        await DetailCourse.find({ id_course: courseid })
                .then((dt) => {
                    res.render('admin/course/lesson/home', { 
                        lessons: mutipleMongooseToObject(dt), 
                        layout: 'admin', 
                        title: 'Courses Admin' });
                })
                .catch (next)
    }
}

module.exports = new ManageCourseController();
