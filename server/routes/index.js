const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ code: 200, data: 'server is running!' });
});

router.get('/health-check', async (req, res) => {
  res.json({ code: 200, data: 'server is running!' });
});

module.exports = router;
