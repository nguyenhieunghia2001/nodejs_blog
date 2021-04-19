module.exports = {
    mutipleMongooseToObject : (mongoosea) => mongoosea.map((mongoose) => mongoose.toObject()),
    mongooseToObject : (mongoose) => mongoose ? mongoose.toObject() : mongoose 
}