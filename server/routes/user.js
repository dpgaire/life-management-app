const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const { createUser, loginUser, findUserByEmail } = require("../models/User");
const router = express.Router();

router.post(
  "/signup",
  [
    body("username", "Username must be at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error_message: "Email already exists" });
      }
      // If email doesn't exist, create the user
      const userId = await createUser(username, email, password);
      res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await loginUser(email, password);
      if (user) {
        const token = generateToken(user.user.id);
        res.status(200).json({ user, token });
      } else {
        res.status(401).json({ error_message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error_message: "Error logging in" });
    }
  }
);
function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = router;
