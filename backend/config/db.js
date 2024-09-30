const mongoose = require('mongoose');

async function connectDb (){
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = connectDb