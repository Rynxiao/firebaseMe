const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ code: 200, message: 'ok' });
  res.end();
});

module.exports = router;
