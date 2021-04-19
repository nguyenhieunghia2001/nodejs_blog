
class ManageCourseController{
    index(req, res, next) {
        res.render('admin/addCourse');
    }
}

module.exports = new ManageCourseController;