
class ManageCourseController{
    index(req, res, next) {
        res.render('admin/addCourse');
    }
    createCourse(req, res, next) {
        const {name, description, studied, request} = req.body;

     
        
        res.json({name, description, studied, request});
    }
}

module.exports = new ManageCourseController;