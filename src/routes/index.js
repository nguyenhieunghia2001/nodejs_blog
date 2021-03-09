const homeRouter = require("./home");

function route(app) {
//   app.get("/home", (req, res) => {
//     res.render("home");
//   });
  app.use('/', homeRouter);
}

module.exports = route;
