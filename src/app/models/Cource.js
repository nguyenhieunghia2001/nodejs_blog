const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Course = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, maxLength: 200},
    description: {type: String},
    slug: { type: String, slug: "name", unique: true },
    img:
    {
        data: Buffer,
        contentType: String
    }
},{
    timestamps: true.valueOf,
});

module.exports = mongoose.model('Course', Course);