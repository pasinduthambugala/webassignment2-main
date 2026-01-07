const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

// Cart routes
router.route("/").get(protect, getCart);
router.route("/addCart").post(protect, addToCart);
router.route("/removeItem/:id").delete(protect, removeFromCart);

module.exports = router;
