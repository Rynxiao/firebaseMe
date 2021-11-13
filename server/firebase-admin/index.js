/* eslint-disable @typescript-eslint/naming-convention */
const admin = require('firebase-admin');
const { map, keys } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const { getTimestamps } = require('./utils');

const firestores = {};

const initialDatabases = (serviceAccountKey, isDefault) => {
  const projectId = serviceAccountKey.project_id;

  if (firestores[projectId]) {
    return firestores[projectId];
  }

  const config = {
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
  };

  if (isDefault) {
    admin.initializeApp(config);
  } else {
    admin.initializeApp(config, projectId);
  }

  const firestore = admin.firestore();
  firestores[projectId] = firestore;
  return firestore;
};

const getProject = async (projectId) => {
  const db = firestores[projectId];
  const snapshots = await db.listCollections();
  const collections = snapshots.map((snapshot) => {
    const { path } = snapshot;
    return { id: uuidv4(), name: path };
  });

  return {
    id: uuidv4(),
    project: projectId,
    collections: collections || [],
  };
};

const getProjects = async () => {
  try {
    return await Promise.all(
      map(keys(firestores), async (projectId) => {
        const project = await getProject(projectId);
        return project;
      })
    );
  } catch (error) {
    logger.error('Get projects error', error);
    throw new Error(error.message);
  }
};

const getCollectionDocuments = async (path, projectId) => {
  try {
    const db = firestores[projectId];
    const collectionRef = db.collection(path);
    const documentRefs = await collectionRef.listDocuments();
    const length = documentRefs.length;

    logger.info(
      `Find document refs of project ${projectId}, length: ${length}`
    );

    if (length > 0) {
      const documentSnapshots = await db.getAll(...documentRefs);

      return documentSnapshots.map((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const lastUpdateTime = getTimestamps(documentSnapshot.updateTime);
          const createTime = getTimestamps(documentSnapshot.createTime);
          return {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
            lastUpdateTime,
            createTime,
          };
        }
        return {};
      });
    }
    return [];
  } catch (error) {
    logger.error('List documents error', error);
    throw new Error(error.message);
  }
};

const getDocumentCollections = async (docPath, projectId) => {
  try {
    const db = firestores[projectId];
    const documentRef = db.doc(docPath);
    const subCollections = await documentRef.listCollections();

    return map(subCollections, (subCollection) => subCollection.id);
  } catch (error) {
    logger.error(`List sub collections of ${docPath} error`, error);
    throw new Error(error.message);
  }
};

const getDocument = async (docPath, projectId) => {
  try {
    const db = firestores[projectId];
    const documentRef = db.doc(docPath);
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const id = documentSnapshot.id;
      const data = documentSnapshot.data();
      const lastUpdateTime = getTimestamps(documentSnapshot.updateTime);
      const createTime = getTimestamps(documentSnapshot.createTime);
      const docData = { id, ...data, lastUpdateTime, createTime };
      logger.info('documentSnapshot id', documentSnapshot.id);
      logger.info('documentSnapshot data', docData);
      return docData;
    }

    return null;
  } catch (error) {
    logger.error(`Get document ${docPath} error`, error);
    throw new Error(error.message);
  }
};

module.exports = {
  initialDatabases,
  getProjects,
  getCollectionDocuments,
  getDocumentCollections,
  getDocument,
};
