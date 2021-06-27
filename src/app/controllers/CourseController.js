const Cource = require("../models/Cource");
const User = require("../models/user");
const Request = require("../models/Request");
const Studied = require("../models/Studied");
const RegisterCourse = require("../models/RegisterCourse");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoos");

class CourseController {
  async home(req, res, next) {
    Cource.find({})
      .then((cource) => {
        res.render("courses/homeCourse", { cource: mutipleMongooseToObject(cource) });
      })
      .catch(next);
  }

  detail(req, res, next) {
    // if (!req.session.emailUser) return res.redirect("../auth/login");
    Cource.findOne({ slug: req.params.slug }).populate('lessons')
      .then(async (course) => {
        //lấy ra những gì đã học của khóa học
        const studied = await Studied.find({ id_course: course._id });
        // lấy yêu cầu của khóa học
        const request = await Request.find({ id_course: course._id });
        res.render(`courses/detail`, {
          course: mongooseToObject(course),
          lessons: mutipleMongooseToObject(course.lessons),
          studied: mutipleMongooseToObject(studied),
          request: mutipleMongooseToObject(request),
        });
      })
      .catch(next);
  }

  //[GET] Register course for user
  async register(req, res, next) {
    const { idcourse } = req.params,
      { emailUser } = req.session;

    const course = await Cource.findOneAndUpdate(
      { slug: idcourse },
      {
        $push: { _emailUser: {email: emailUser} },
      })

    //update user
    await User.findOneAndUpdate(
      { email: emailUser },
      {
        $push: { _idCourse: course._id },
      })
    res.redirect(`../../course/video?courseid=${course._id}`);
  }
  //[POST]
  store(req, res, next) {
    const FormData = req.body;
    const course = new Cource(FormData);
    course
      .save()
      .then(() => res.redirect("/home"))
      .catch((err) => { });
  }
}

module.exports = new CourseController();
