const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require('./routes/cartRoutes');
const authRouters = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());

// DB connection
const DB = require('./connection/DB');
DB.connectionWithDB();

const chatRoutes = require('./routes/chatRoutes');

// Route registration
app.use('/api/chat', chatRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRouters);
app.use('/api/order', orderRoutes);

// Global error handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));