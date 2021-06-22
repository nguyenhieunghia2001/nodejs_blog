const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Detail_Courses = new Schema({
    _id: {type: Schema.Types.ObjectId},
    id_course: {type: Schema.Types.ObjectId, ref: 'Course'},
    name_video: {type: String},
    id_video: {type: String}
});

module.exports = mongoose.model('Detail_Courses', Detail_Courses);