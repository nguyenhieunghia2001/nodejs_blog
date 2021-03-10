const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/my_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }catch(error){
    console.log('connect fail');
  }
}

module.exports = { connect };
