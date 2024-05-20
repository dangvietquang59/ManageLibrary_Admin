const express = require("express");
const router = express.Router();

const authController = require("../controllers/user");
const authMiddleware = require("../middleware/authentication");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
