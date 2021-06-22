const DetailCource = require("../models/DetailCourse");
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoos');

class DetailCourseController {
    index(req, res, next) {
        const { courseid } = req.query;
        DetailCource.find({ id_course: courseid })
            .then(dtCourse => {
                res.render('courses/playvideo', {
                    dtCourse: mutipleMongooseToObject(dtCourse),
                })
            })

            .catch(next)
    }

}

module.exports = new DetailCourseController;