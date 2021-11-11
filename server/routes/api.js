const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getProjects,
  getCollectionDocuments,
  getDocument,
  getDocumentCollections,
} = require('../firebase-admin');
const { uploadAndWriteMeta } = require('../services');
const logger = require('../utils/logger');

const root = path.resolve(__dirname, '..');
const accountsPath = path.resolve(root, 'accounts');
const upload = multer({ dest: accountsPath });
const router = express.Router();

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
    const documents = await getCollectionDocuments(collectionPath, projectId);
    logger.info(`Get documents of ${projectId}`);

    if (documents) {
      res.json({ code: 200, data: documents });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

router.get('/document', async (req, res) => {
  try {
    const projectId = req.query.projectId;
    const docPath = req.query.path;
    const document = await getDocument(docPath, projectId);
    logger.info(`Get documents of ${projectId}`);

    if (document) {
      res.json({ code: 200, data: document });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

router.get('/collections', async (req, res) => {
  try {
    const projectId = req.query.projectId;
    const docPath = req.query.path;
    const collections = await getDocumentCollections(docPath, projectId);
    logger.info(`Get collections of document ${projectId}-${docPath}`);

    if (collections) {
      res.json({ code: 200, data: collections });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

module.exports = router;
