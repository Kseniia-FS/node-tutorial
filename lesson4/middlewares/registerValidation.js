const { check } = require("express-validator");

const validOptions = [
  check("firstName", "First name is required").notEmpty(),
  check("lastName", "Last name is required").notEmpty(),
  check("email", "Email is required").notEmpty().isEmail(),
  check("password", "Password is required").isLength({ min: 2, max: 6 }),
];

module.exports = validOptions;
