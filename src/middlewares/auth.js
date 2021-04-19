const Login = require("../app/models/Login");
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
        // console.log(userId);
        Login.findOne({ email: emailUser })
            .then((account) => {
                req.user = account;
                res.locals.currentUser = mongooseToObject(account);
                // console.log(res.locals.currentUser);
                User.findOne({ email: emailUser })
                    .then(u => {
                        res.locals.userName = u.username;
                        next();
                    })
                    .catch(() => {
                        console.log('lỗi tìm user trong middleware');
                        next();
                    });

                
            })
            .catch(() => {
                console.log(err);
                next();
            });
    }
    else {
        next();
    }
};
