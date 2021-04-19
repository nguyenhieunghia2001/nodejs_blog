const Cource = require("../models/Cource");
const DetailCource = require("../models/DetailCourse");
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoos');

class CourseController{
    index(req, res, next){
        if(!req.session.emailUser)
            return res.redirect('../auth/login');
        Cource.findOne({slug: req.params.slug})
            .then(course => {
                DetailCource.find({slug_course: course.slug})
                    .then(dtcourse => {
                        console.log(req.user);
                        //lấy ra những gì đã học của khóa học
                        const studied = course.studied.split('//');
                        // lấy yêu cầu của khóa học
                        const request = course.request.split('//');
                        res.render(`courses/detail`, {
                                                        course: mongooseToObject(course), 
                                                        dtcourse: mutipleMongooseToObject(dtcourse),
                                                        studied,
                                                        request
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