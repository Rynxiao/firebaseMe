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

const uploadAndRename = async (files) => {
  try {
    const metaStr = await fsPromise.readFile(metaPath, { encoding: 'utf8' });
    const meta = JSON.parse(metaStr);

    files.forEach(async (file) => {
      const { filename, originalname } = file;
      const oldPath = path.resolve(accountsPath, filename);

      const fileContentStr = await fsPromise.readFile(oldPath, {
        encoding: 'utf8',
      });
      const fileContent = JSON.parse(fileContentStr);
      const index = findIndex(meta, { project_id: fileContent.project_id });

      if (index === -1) {
        const newPath = path.resolve(
          accountsPath,
          `${new Date().getTime()}_${originalname}`
        );
        await fsPromise.writeFile(
          metaPath,
          JSON.stringify(meta.concat(fileContent)),
          { encoding: 'utf8' }
        );
        await fsPromise.rename(oldPath, newPath);
      } else {
        await fsPromise.unlink(oldPath);
      }
    });
  } catch (error) {
    console.log('rename error', error);
  }
};

const readServiceAccountKeys = async () => {
  try {
    const files = await fsPromise.readdir(accountsPath);
    const filesContent = files.map(async (file) => {
      const filePath = path.resolve(accountsPath, file);
      const result = await fsPromise.readFile(filePath, { encoding: 'utf8' });
      return JSON.parse(result);
    });
    return filesContent;
  } catch (error) {
    console.log('read files error', error);
    return null;
  }
};

router.get('/', async (req, res) => {
  const accountsPromises = await readServiceAccountKeys();
  const accounts = await Promise.all(accountsPromises);

  const projectsPromises = accounts.map(async (account, index) => {
    if (account) {
      const projectId = account.project_id;
      const collections = await listCollections(account, index === 0);
      return { id: uuidv4(), project: projectId, collections };
    }
    return null;
  });
  const projects = await Promise.all(projectsPromises);

  console.log('projects', projects);
  res.json({ code: 200, data: projects });
  res.end();
});

router.post('/upload', upload.array('account', 12), async (req, res) => {
  try {
    const { files } = req;
    await uploadAndRename(files);
    res.json({ code: 200, message: 'Upload service account successfully!' });
    res.end();
  } catch (error) {
    res.json({ code: 500, message: error.message });
    res.end();
  }
});

module.exports = router;
