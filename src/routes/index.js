const homeRouter = require("./home");
const courseRouter = require("./courses");
const lessonRouter = require("./api/admin/lesson");
const authRouter = require("./auth");
const userRouter = require("./user");
const adminCourseRouter = require("./admin/manageCourse");
const adminStudentRouter = require("./admin/manageStudent");
const adminHomeRouter = require("./admin/home");
const { isAuth } = require("../middlewares/authenlicate");

const siteRouter = require("./site");

function route(app) {
    app.use("/course", courseRouter);
    app.use("/lesson", lessonRouter);
    app.use("/auth", authRouter);
    app.use("/user", userRouter);

    app.use('/admincourse', isAuth,adminCourseRouter);
    app.use('/adminhome', isAuth, adminHomeRouter);
    app.use('/adminstudent', isAuth, adminStudentRouter);

    app.use("/", homeRouter);
}

module.exports = route;
