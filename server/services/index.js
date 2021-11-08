const path = require('path');
const fsPromise = require('fs/promises');
const { findIndex } = require('lodash');
const { initialDatabases } = require('../firebase-admin');
const logger = require('../utils/logger');

const root = path.resolve(__dirname, '..');
const metaPath = path.resolve(root, 'meta.json');
const accountsPath = path.resolve(root, 'accounts');

const readServiceAccountKeys = async () => {
  try {
    const accountMetaStr = await fsPromise.readFile(metaPath, {
      encoding: 'utf8',
    });
    return JSON.parse(accountMetaStr);
  } catch (error) {
    logger.error(`Read meta file ${metaPath} error`, error);
    return null;
  }
};

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
    logger.error(`Upload and write meta ${metaPath} error`, error);
    throw new Error(error.message);
  }
};

const initialApps = async () => {
  const accounts = await readServiceAccountKeys();

  if (accounts) {
    accounts.map(async (account, index) => {
      if (account) {
        initialDatabases(account, index === 0);
      }
    });
  }
};

module.exports = {
  initialApps,
  uploadAndWriteMeta,
};
