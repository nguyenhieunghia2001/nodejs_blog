const Cource = require("../models/Cource");
const DetailCource = require("../models/DetailCourse");
const Request = require("../models/Request");
const Studied = require("../models/Studied");
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoos');

class CourseController{
    index(req, res, next){
        if(!req.session.emailUser)
            return res.redirect('../auth/login');
        Cource.findOne({slug: req.params.slug})
            .then(course => {
                DetailCource.find({slug_course: course.slug})
                    .then(async dtcourse => {
                        // console.log(req.user);
                        //lấy ra những gì đã học của khóa học
                        const studied = await Studied.find({id_course: course._id});
                        // lấy yêu cầu của khóa học
                        const request = await Request.find({id_course: course._id});
                        res.render(`courses/detail`, {
                                                        course: mongooseToObject(course), 
                                                        dtcourse: mutipleMongooseToObject(dtcourse),
                                                        studied: mutipleMongooseToObject(studied),
                                                        request: mutipleMongooseToObject(request),
                                                    });
                    })
                    .catch(next)
            })
            .catch(next)
    }

    //[GET]
    create(req, res, next){
        res.render('courses/create')
    }
    //[POST]
    store(req, res, next){
        const FormData = req.body 
        const course = new Cource(FormData)
        course.save()
            .then(()=> res.redirect('/home')) 
            .catch(err => {

            })  
    }
}

module.exports = new CourseController;