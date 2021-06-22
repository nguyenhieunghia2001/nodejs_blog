const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Request = new Schema({
    id_course: {type: Schema.Types.ObjectId},
    request: {type: String},
},{
    timestamps: true.valueOf,
});

module.exports = mongoose.model('Request', Request);