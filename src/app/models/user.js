const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const user = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  username: { type: String, default: '' },
  gender: { type: String, default: 'male' },
  type: { type: String, default: 'member' },
  status: { type: String, default: 'false' },
  facebookId: { type: String, default: '' },
  googleId: { type: String, default: '' },
  _idCourse: [{ type: Schema.Types.ObjectId, ref: "Course" }],
},
  { collection: 'user' },
  { timestamps: true.valueOf });

module.exports = mongoose.model('user', user);