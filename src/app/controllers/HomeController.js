const Course = require("../models/Cource");
const User = require("../models/user");
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoos');

class HomeController {
  index(req, res, next) {
    Course.aggregate([{ $limit: 5}])
      .then(cource => {
        res.render('home', { cource, title: 'Trang chủ' });
      })
      .catch(next)
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