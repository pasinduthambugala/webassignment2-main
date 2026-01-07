const express = require("express");
const { protect } = require("../controllers/authController");
const orderController = require("../controllers/orderController.js");

const router = express.Router();

router.post('/', protect, orderController.checkout);
router.get('/history', protect, orderController.history);

module.exports = router;