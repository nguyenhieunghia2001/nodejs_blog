const axios = require('axios').default;
const Login = require("../models/Login");
const User = require("../models/user");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../util/mongoos");
//hash
const bcrypt = require("bcrypt");
const { renderSync } = require("node-sass");
const saltRounds = 10;

class AuthController {
    login(req, res) {
        res.render("auth/login");
    }
    loginPost(req, res, next) {
        const formData = req.body;

        //tìm account này có chưa 
        Login.findOne({ email: formData.email })
            .then(acoount => {
                // console.log(acoount.password);
                bcrypt.compare(formData.password, acoount.password, function (err, result) {
                    if (result == true) {
                        req.session.emailUser = acoount.email;                        
                        res.redirect('/');
                    }
                    // res.render("auth/login", {erro: "Đăng nhập không thành công"});
                    else res.send("ko thành công");
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    register(req, res, next) {
        res.render("auth/register");
    }
    createAccount(req, res, next) {
        const formData = req.body;

        Login.exists({ email: formData.email }, (err, user) => {
            if (!user) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(formData.password, salt, function (err, passHashed) {
                        if (err) res.send("error");

                        const account = new Login({ email: formData.email, password: passHashed });
                        const adduser = new User({ email: formData.email, username: formData.username});
                        account.save();
                        adduser.save();
                        res.redirect('login');
                    });
                });
            }
            else
                res.render('auth/register', { errRegister: 'Lỗi đăng kí' });
        });
    }

    //đăng xuất
    callbackfb (req, res) {
        res.redirect('/');
    }
    
    logout(req, res, next) {
        delete req.session.emailUser;
        res.redirect('/');
    }
}

module.exports = new AuthController();
