const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Assign Role
router.post('/roles/assign', async (req, res) => {
  const { userId, role } = req.body;

  try {
    await User.assignRole(userId, role);
    res.status(200).send(`Role ${role} assigned to user ${userId}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get Users by Role
router.get('/roles/:role', async (req, res) => {
  const { role } = req.params;

  try {
    const users = await User.getUsersByRole(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
