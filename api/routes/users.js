const express = require('express');

const {
  readAllUsers,
} = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const allUsers = readAllUsers();
  res.json(allUsers);
});

module.exports = router;
