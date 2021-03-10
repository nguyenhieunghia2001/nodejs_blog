const Cource = require("../models/Cource");

class SiteController {
  index(req, res) {
    Cource.find({}, function (err, courses) {
      if (!err) res.json(courses);
      else res.status(400).json({ loi: "Sai!!" });
    });
    // res.json({
    //     name: 'chào'
    // })
    // res.render('home');
  }
}

module.exports = new SiteController();
