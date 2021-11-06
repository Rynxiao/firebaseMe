const express = require('express');
const multer = require('multer');
const path = require('path');
const fsPromise = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { findIndex } = require('lodash');
const { listCollections } = require('../firebase-admin');

const root = path.resolve(__dirname, '..');
const metaPath = path.resolve(root, 'meta.json');
const accountsPath = path.resolve(root, 'accounts');
const upload = multer({ dest: accountsPath });
const router = express.Router();

const uploadAndWriteMeta = async (files) => {
  try {
    const metaStr = await fsPromise.readFile(metaPath, { encoding: 'utf8' });
    const meta = JSON.parse(metaStr);

    files.forEach(async (file) => {
      const { filename } = file;
      const filePath = path.resolve(accountsPath, filename);

      const fileContentStr = await fsPromise.readFile(filePath, {
        encoding: 'utf8',
      });
      const fileContent = JSON.parse(fileContentStr);
      const index = findIndex(meta, { project_id: fileContent.project_id });

      if (index === -1) {
        await fsPromise.writeFile(
          metaPath,
          JSON.stringify(meta.concat(fileContent)),
          { encoding: 'utf8' }
        );
      } else {
        await fsPromise.unlink(filePath);
      }
    });
  } catch (error) {
    console.log('rename error', error);
  }
};

const readServiceAccountKeys = async () => {
  try {
    const accountMetaStr = await fsPromise.readFile(metaPath, {
      encoding: 'utf8',
    });
    return JSON.parse(accountMetaStr);
  } catch (error) {
    console.log('read files error', error);
    return null;
  }
};

router.get('/test', async (req, res) => {
  // await uploadAndWriteMeta([{ filename: 'SCBKgwggSkAgEAAoIBAQCjqWovpPWHF' }]);
  res.json({ code: 200, data: [] });
});

router.get('/projects', async (req, res) => {
  const accounts = await readServiceAccountKeys();

  const projectsPromises = accounts.map(async (account, index) => {
    if (account) {
      const projectId = account.project_id;
      const collections = await listCollections(account, index === 0);
      return {
        id: uuidv4(),
        project: projectId,
        collections: collections || [],
      };
    }
    return null;
  });
  const projects = await Promise.all(projectsPromises);

  res.json({ code: 200, data: projects });
  res.end();
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

module.exports = router;
