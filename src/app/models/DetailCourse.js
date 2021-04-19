const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Detail_Courses = new Schema({
    name_video: {type: String},
    id_video: {type: String},
    slug_course: {type: String},
});

module.exports = mongoose.model('Detail_Courses', Detail_Courses);