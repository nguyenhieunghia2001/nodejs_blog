const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Cource = new Schema({
    name: {type: String, maxLength: 200},
    description: {type: String},
    slug: { type: String, slug: "name", unique: true }
},{
    timestamps: true.valueOf,
});

module.exports = mongoose.model('Cource', Cource);