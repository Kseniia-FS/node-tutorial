const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/AuthController");
const validOptions = require("../middlewares/registerValidation");

const router = express.Router();

router.post("/register", validOptions, authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
