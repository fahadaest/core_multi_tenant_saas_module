require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connection successful');
    } catch (err) {
        console.error('❌ MongoDB Connection failed:', err.message);
        process.exit(1);
    }
};
module.exports = connectDB;