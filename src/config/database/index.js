const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/courses_onl", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("kết nối Thành công");
  }catch(error){
    console.log('connect fail');
  }
}

module.exports = { connect };
