const Cource = require("../models/Cource");

class SiteController {
  index(req, res, next) {
    Cource.find({})
      .then(cource => {
        cource = cource.map(cource => cource.toObject());
        res.render('search', {cource})
      })
      .catch(next)
    // res.render('home');
  }
}

module.exports = new SiteController();
