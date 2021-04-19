const DetailCource = require("../models/DetailCourse");
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoos');

class DetailCourseController {
    index(req, res, next) {
        const idCourse = req.params.slug;
        const idVideo = req.params.idvideo;
        DetailCource.find({ slug_course: idCourse })
            .then(dtCourse => {
                res.render('courses/playvideo', {
                    dtCourse: mutipleMongooseToObject(dtCourse),
                    idVideo
                })
            })

            .catch(next)
    }

}

module.exports = new DetailCourseController;