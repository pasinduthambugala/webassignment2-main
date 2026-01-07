const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectionWithDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`__ DB CONNECTED: ${conn.connection.host} __`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectionWithDB };