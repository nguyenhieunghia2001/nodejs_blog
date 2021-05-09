const Course = require("../models/Cource");
const User = require("../models/user");

class HomeController {
  index(req, res, next) {
    Course.find({})
      .then(cource => {
        cource = cource.map(cource => cource.toObject());
        res.render('home', { cource })
      })
      .catch(next)
    // res.render('home');
  }
  picture(req, res, next) {
    Course.findOne({ _id: req.params.id })
      .then(course => {
        res.header('Content-Type', 'image/jpeg').send(course.img.data);
      })
      .catch(() => res.status(404).send('ko tìm dc file'));
  }
}

module.exports = new HomeController;