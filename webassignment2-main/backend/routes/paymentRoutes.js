const express = require('express');
const router = express.Router();
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const { protect } = require('../controllers/authController');

router.post('/process', protect, processPayment);
router.get('/stripeapi', sendStripeApiKey);

module.exports = router;
