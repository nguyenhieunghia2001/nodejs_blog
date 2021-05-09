const homeRouter = require("./home");
const courseRouter = require("./courses");
const authRouter = require("./auth");
const userRouter = require("./user");
const adminCourseRouter = require("./admin/manageCourse");
const adminStudentRouter = require("./admin/manageStudent");
const adminHomeRouter = require("./admin/home");

const siteRouter = require("./site");

function route(app) {
    let users = {
        name: "Ritik",
        Age: "18",
    };

    //Route for adding cookie
    app.get("/setuser", (req, res) => {
        res.cookie("userData", users.name);
        res.send("user data added to cookie");
    });
    app.get('/getuser', (req, res) => {
        //shows all the cookies
        res.send(req.cookies.userData);
    });
    app.get('/logout', (req, res)=>{
        //it will clear the userData cookie
        res.clearCookie('userData');
        res.send('user logout successfully');
        });
    app.use("/search", siteRouter);
    app.use("/course", courseRouter);
    app.use("/auth", authRouter);
    app.use("/user", userRouter);

    app.use('/admincourse', adminCourseRouter);
    app.use('/adminhome', adminHomeRouter);
    app.use('/adminstudent', adminStudentRouter);

    app.use("/", homeRouter);
}

module.exports = route;
