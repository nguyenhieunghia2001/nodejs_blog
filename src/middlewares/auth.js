const User = require("../app/models/user");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../util/mongoos");

module.exports = function auth(req, res, next) {
    const { emailUser } = req.session;
    // res.send(req.cookies);
    res.locals.currentUser = null;
    if (emailUser) {
        User.findOne({ email: emailUser })
            .then(u => {
                res.locals.userName = u.username;
                req.user = u;
                res.locals.currentUser = mongooseToObject(u);
                next();
            })
            .catch(() => {
                console.log('lỗi tìm user trong middleware');
                next();
            });
    }
    else {
        next();
    }
};
