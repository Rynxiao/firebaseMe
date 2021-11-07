const express = require('express');
const multer = require('multer');
const path = require('path');
const { getProjects, getAllDocuments } = require('../firebase-admin');
const { uploadAndWriteMeta } = require('../services');

const root = path.resolve(__dirname, '..');
const accountsPath = path.resolve(root, 'accounts');
const upload = multer({ dest: accountsPath });
const router = express.Router();

router.get('/ping', async (req, res) => {
  res.json({ code: 200, data: ['living'] });
});

router.get('/projects', async (req, res) => {
  const projects = await getProjects();
  res.json({ code: 200, data: projects });
});

router.post('/upload', upload.array('account', 12), async (req, res) => {
  try {
    const { files } = req;
    await uploadAndWriteMeta(files);
    res.json({ code: 200 });
    res.end();
  } catch (error) {
    res.json({ code: 500, message: error.message });
    res.end();
  }
});

router.get('/documents', async (req, res) => {
  try {
    const projectId = req.query.projectId;
    const collectionPath = req.query.path;
    const documents = await getAllDocuments(collectionPath, projectId);

    if (documents) {
      res.json({ code: 200, data: documents });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

module.exports = router;
