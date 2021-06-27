const Course = require("../../models/Cource");
const DetailCourse = require("../../models/DetailCourse");
const Request = require("../../models/Request");
const Studied = require("../../models/Studied");
const mongoose = require("mongoose");
var moment = require('moment');
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require("../../../util/mongoos");

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = moment(new Date(item[prop])).format("MMM");
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}

class LessonAPI {
    async getUserRegisterWithMonth(req, res, next) {
        const courses = await Course.find({})
        const courseArr = Object.values(courses);
        let monthArr = []
        courseArr.forEach(c => {
            const register = Object.values(c._emailUser);
            const grouped = register.groupBy('time');
            monthArr.push(grouped);
        })
        // console.log(monthArr[1].Jun);
        const result = monthArr.reduce((months, currentItem) => {
            months.Jan = currentItem.Jan ? currentItem.Jan.length + months.Jan : months.Jan;
            months.Feb = currentItem.Feb ? currentItem.Feb.length + months.Feb : months.Feb;
            months.Mar = currentItem.Mar ? currentItem.Mar.length + months.Mar : months.Mar;
            months.Apr = currentItem.Apr ? currentItem.Apr.length + months.Apr : months.Apr;
            months.May = currentItem.May ? currentItem.May.length + months.May : months.May;
            months.Jun = currentItem.Jun ? currentItem.Jun.length + months.Jun : months.Jun;
            months.Jul = currentItem.Jul ? currentItem.Jul.length + months.Jul : months.Jul;
            months.Aug = currentItem.Aug ? currentItem.Aug.length + months.Aug : months.Aug;
            months.Sep = currentItem.Sep ? currentItem.Sep.length + months.Sep : months.Sep;
            months.Oct = currentItem.Oct ? currentItem.Oct.length + months.Oct : months.Oct;
            months.Nov = currentItem.Nov ? currentItem.Nov.length + months.Nov : months.Nov;
            months.Dec = currentItem.Dec ? currentItem.Dec.length + months.Dec : months.Dec;
            return months;
        }, {
            'Jan': 0,
            'Feb': 0,
            'Mar': 0,
            'Apr': 0,
            'May': 0,
            'Jun': 0,
            'Jul': 0,
            'Aug': 0,
            'Sep': 0,
            'Oct': 0,
            'Nov': 0,
            'Dec': 0,
        })
        return res.status(200).json({
            success: true,
            months: result,
        });
    }
}

module.exports = new LessonAPI;