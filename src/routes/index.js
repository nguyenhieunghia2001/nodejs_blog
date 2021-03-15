const homeRouter = require('./home');
const courseRouter = require('./courses');

const siteRouter = require('./site');


function route(app) {
//   app.get('/', (req, res) => {
//     res.render("home");
//   });
    app.use('/search', siteRouter);
    app.use('/course', courseRouter);
    app.use('/home', homeRouter);
   
}

module.exports = route;
