const Cource = require("../models/Cource");

class CourseController{
    index(req, res, next){
        Cource.findOne({course: req.params.slug})
            .then(course =>{
                res.render('courses/detail', {course})
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