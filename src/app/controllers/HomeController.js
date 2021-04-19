const Cource = require("../models/Cource");
const User = require("../models/user");

class HomeController{
    // index(req, res){
    //     res.render('home');
    // }
    index(req, res, next) {
        Cource.find({})
          .then(cource => {
            cource = cource.map(cource => cource.toObject());
            res.render('home', {cource})
          })
          .catch(next)
        // res.render('home');
      }
}

module.exports = new HomeController;