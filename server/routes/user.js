const express = require('express');
const jwt = require("jsonwebtoken");
const { createUser, loginUser } = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = await createUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      const token = generateToken(user.user.id); 
      console.log('first')
      res.status(200).json({ user, token }); 
    } else {
      res.status(401).json({ message: "Invalid credentials" }); 
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });
  return token;
}

module.exports = router;


