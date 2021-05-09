const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Studied = new Schema({
    id_course: {type: String},
    studied: {type: String},
},{
    timestamps: true.valueOf,
});

module.exports = mongoose.model('Studied', Studied);