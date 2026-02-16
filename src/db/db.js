const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Databse connected successfully');
    }catch(err){
        console.log('Database error',err);
    }
}

module.exports = connectDB;