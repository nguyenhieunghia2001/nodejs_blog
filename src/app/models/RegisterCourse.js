const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const RegisterCourse = new Schema({
    _id: Schema.Types.ObjectId,
    id_course: {type: Schema.Types.ObjectId, ref: 'Course'},
    email: { type: String, default: '' },    
},{
    timestamps: true.valueOf,
});

module.exports = mongoose.model('RegisterCourse', RegisterCourse);