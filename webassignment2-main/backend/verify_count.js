const mongoose = require('mongoose');
const Book = require('./models/bookModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    try {
        const count = await Book.countDocuments();
        console.log(`Total books in DB: ${count}`);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
});
