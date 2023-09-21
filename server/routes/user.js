const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const { createUser, loginUser, findUserByEmail } = require("../models/User");
const router = express.Router();

router.post(
  "/signup",
  [
    body("name", " Name must be at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    })
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error_message: "Email already exists." });
      }
      const result = await createUser(name,email,password);
      const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({error, error: "Something went wrong." });
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
      console.log('user',user)
      if (user) {
        const token = generateToken(user.id);
        res.status(200).json({user,token});
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
