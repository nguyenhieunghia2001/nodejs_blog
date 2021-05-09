const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const user = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  gender: {type: String, default: 'male'},
  // avartar: {type: Image, default: ''},
  status: { type: String, default: 'noactive' },

  deleteAt: { type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  // action: { type: String, default: 'System'},

}, { collection: 'user' })

module.exports = mongoose.model('user', user);