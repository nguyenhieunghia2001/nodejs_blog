const Course = require("../../models/Cource");
const DetailCourse = require("../../models/DetailCourse");
const Request = require("../../models/Request");
const Studied = require("../../models/Studied");
const mongoose = require("mongoose");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

//chuyển mảng thành mảng object
const reductRequestsToArrObejct = (arr, id_course) => {
    if(!Array.isArray(arr)) return [{id_course, request: arr}];
    return arr.reduce((arrObject, values) => {
        return [...arrObject, { id_course, request: values }]
    }, [])
}
const reductStudiedsToArrObejct = (arr, id_course) => {
    if(!Array.isArray(arr)) return [{id_course, studied: arr}];
    return arr.reduce((arrObject, values) => {
        return [...arrObject, { id_course, studied: values }]
    }, [])
}

class ManageCourseController {
    async index(req, res, next) {
        const courses = await Course.find({});

        res.render('admin/course/home', { courses: mutipleMongooseToObject(courses), layout: 'admin', title: 'Courses Admin' });
    }

    async addcourseIndex(req, res, next) {

        res.render('admin/course/addCourse', { layout: 'admin', title: 'Courses Admin' });
    }

    async addcourse(req, res, next) {
        const { name, description, studied, request, video } = req.body;

        //thêm khóa học
        const course = new Course({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            description: description,
            name_request: name,
            img: {
                data: req.file.buffer,
                contentType: 'image/png'
            }
        });
        await course.save();

        //lấy danh sách yêu cầu để add
        let ReqList = reductRequestsToArrObejct(request, course._id);

        //lấy danh sách sẽ học được gì để add
        let StuList = reductStudiedsToArrObejct(studied, course._id);

        const requestInsert = await Request.insertMany(ReqList);
        const studiedInsert = await Studied.insertMany(StuList);

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

        const course = await Course.findOne({ _id: id });

        //xóa request - studied
        await Request.deleteMany({ id_course: id });
        await Studied.deleteMany({ id_course: id });

        //tạo lại
        //lấy danh sách yêu cầu để add
        let ReqList = reductRequestsToArrObejct(request, course._id);

        //lấy danh sách sẽ học được gì để add
        let StuList = reductStudiedsToArrObejct(studied, course._id);

        const requestInsert = await Request.insertMany(ReqList);
        const studiedInsert = await Studied.insertMany(StuList);

        course.name = name;
        course.description = description;
        if (req.file)
            course.img = {
                data: req.file.buffer,
                contentType: 'image/png'
            }
        await course.save();

        res.redirect('../../admincourse');
    }

    async delcourse(req, res, next) {
        const { id } = req.params;
        // res.redirect('../../admincourse')
        await Course.deleteOne({ _id: id })
            .then(() => res.redirect('../../admincourse'))
            .catch(next)
    }

    async lesson(req, res, next) {
        const { courseid } = req.query;

        await DetailCourse.find({ id_course: courseid })
            .then((dt) => {
                res.render('admin/course/lesson/home', {
                    lessons: mutipleMongooseToObject(dt),
                    layout: 'admin',
                    title: 'Courses Admin'
                });
            })
            .catch(next)
    }
}

module.exports = new ManageCourseController();
