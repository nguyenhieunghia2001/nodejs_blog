const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const DetailCourse = new Schema({
    slug: { type: String, slug: "name", unique: true },
    willstudy: {type: String},
    status: {type: int},
    
});

module.exports = mongoose.model('DetailCourse', DetailCourse);