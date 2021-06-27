const axios = require('axios').default;
const User = require("../models/user");
const mongoose = require("mongoose");
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../util/mongoos");
const { sendMail } = require('../../config/service/mailer');
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
        User.findOne({ email: formData.email })
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

        User.exists({ email: formData.email }, (err, user) => {
            if (!user) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(formData.password, salt, async function (err, passHashed) {
                        if (err) res.send("error");

                        const adduser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: formData.email,
                            username: formData.username,
                            password: passHashed,
                        });
                        adduser.save();

                        await sendMail(
                            `${adduser.email}`,
                            'KÍCH HOẠT TÀI KHOẢN',
                            'Chào bạn, chọn KÍCH HOẠT để hoàn thành đăng kí',
                            `<a href="http://localhost:8888/auth/active?id=${adduser._id}">KÍCH HOẠT</a>`
                        )
                        res.redirect('login');
                    });
                });
            }
            else
                res.render('auth/register', { errRegister: 'Lỗi đăng kí' });
        });
    }

    async active(req, res, next) {
        const { id } = req.query;

        const userUpdate = await User.findOneAndUpdate(
            { _id: id },
            { status: 'true' }
        )

        req.session.emailUser = userUpdate.email;
        res.redirect('../');
    }

    logout(req, res, next) {
        delete req.session.emailUser;
        res.redirect('/');
    }
}

module.exports = new AuthController();
