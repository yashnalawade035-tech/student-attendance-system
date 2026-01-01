const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 'student_db' is the name of your database
        await mongoose.connect('mongodb://127.0.0.1:27017/student_db');
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;