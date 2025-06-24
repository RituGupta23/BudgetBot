const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connected');
    } catch (e) {
        console.error('Database Connection Error:' + e.message);
        process.exit(1);
    }
};

module.exports = connectDB;