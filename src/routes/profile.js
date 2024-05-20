const express = require("express");
const router = express.Router();

const authController = require("../controllers/profile");
const authMiddleware = require("../middleware/authentication");

router.post(
  "/update-profile",
  authMiddleware.verifyToken,
  authController.updateProfile
);

module.exports = router;
