const Course = require("../../models/Cource");
const DetailCourse = require("../../models/DetailCourse");
const Request = require("../../models/Request");
const Studied = require("../../models/Studied");
const mongoose = require("mongoose");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

class LessonAPI {
    async addLesson(req, res, next) {
        const { lessonName, lessonLink, courseId } = req.query;

        const lesson = new DetailCourse({
            _id: new mongoose.Types.ObjectId(),
            id_course: courseId,
            name_video: lessonName,
            id_video: lessonLink,
        });
        await lesson.save();
        await Course.findOneAndUpdate(
            {_id: courseId},
            {
                $push: {lessons: lesson._id}
            }
        );

        const dtCourses = await DetailCourse.find({ id_course: courseId })
        // console.log(dtCourses[0]);
        // return res.status(400).json({});
        return res.status(200).json({
            success: true,
            lessons: dtCourses,
        });
    }
    async getLesson(req, res, next) {
        const { lessonId } = req.query;

        const lesson = await DetailCourse.find({ _id: lessonId });
        return res.status(200).json({
            success: true,
            lesson
        });
    }
    async updateLesson(req, res, next) {
        const { lessonName, lessonLink, lessonId } = req.query;

        //cập nhật 
        const update = await DetailCourse.findOneAndUpdate(
            { _id: lessonId },
            { name_video: lessonName, id_video: lessonLink },
            { new: true }
        )

        //trả ra danh sách bài học để render
        const dtCourses = await DetailCourse.find({ id_course: update.id_course })
        return res.status(200).json({
            success: true,
            lessons: dtCourses,
        });
    }
}

module.exports = new LessonAPI;