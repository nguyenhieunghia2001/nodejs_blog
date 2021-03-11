const homeRouter = require('./home');
const siteRouter = require('./site');


function route(app) {
//   app.get('/', (req, res) => {
//     res.render("home");
//   });
    app.use('/search', siteRouter);

    app.use('/home', homeRouter);
   
}

module.exports = route;
