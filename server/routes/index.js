const express = require('express');
const { listCollections } = require('../firebase-admin');

const router = express.Router();

router.get('/', async (req, res) => {
  await listCollections();

  res.json({ code: 200, message: 'ok' });
  res.end();
});

module.exports = router;
