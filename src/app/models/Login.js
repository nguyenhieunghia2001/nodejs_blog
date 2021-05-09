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
  id_request: [{type: Schema.Types.ObjectId, ref: 'user'}],
  
}, { collection: 'login' })

module.exports = mongoose.model('login', login);
