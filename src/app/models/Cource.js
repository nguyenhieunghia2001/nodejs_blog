const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Course = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, maxLength: 200 },
    description: { type: String },
    slug: { type: String, slug: "name", unique: true },
    img:
    {
        data: Buffer,
        contentType: String
    },
    _emailUser: [{ email: { type: String, ref: "user" }, time: {type: Date, default: Date.now} }],
    requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
    studies: [{ type: Schema.Types.ObjectId, ref: 'Studied' }],
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Detail_Courses' }],
}, {
    timestamps: true.valueOf,
});

module.exports = mongoose.model('Course', Course);