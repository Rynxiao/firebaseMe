/* eslint-disable @typescript-eslint/naming-convention */
const admin = require('firebase-admin');
const { map, keys } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

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

const getAllDocuments = async (path, projectId) => {
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
          return { id: documentSnapshot.id, ...documentSnapshot.data() };
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

module.exports = {
  initialDatabases,
  getProjects,
  getAllDocuments,
};
