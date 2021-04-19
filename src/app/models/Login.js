const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const login = new Schema({
  email: { type: String, default: ''},
  password: { type: String, default: ''},

  loginAt: { type: Date, default: Date.now},
  logoutAt: { type: Date, default: Date.now},
  action: { type: String, default: 'member'},
  
}, { collection: 'login' })

module.exports = mongoose.model('login', login);
