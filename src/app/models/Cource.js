const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    name: {type: String, maxLength: 200},
    description: {type: String, maxLength: 200},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
  });

module.exports = mongoose.model('Cource', BlogPost);