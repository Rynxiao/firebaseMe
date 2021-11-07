/* eslint-disable @typescript-eslint/naming-convention */
const admin = require('firebase-admin');
const { map, keys } = require('lodash');
const { v4: uuidv4 } = require('uuid');

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

    console.log('path', path);
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
    console.log('list collections error', error);
    return null;
  }
};

const getAllDocuments = async (path, projectId) => {
  try {
    const db = firestores[projectId];
    const collectionRef = db.collection(path);
    const documentRefs = await collectionRef.listDocuments();
    const documentSnapshots = await db.getAll(...documentRefs);

    return documentSnapshots.map((documentSnapshot) => {
      if (documentSnapshot.exists) {
        return { id: documentSnapshot.id, ...documentSnapshot.data() };
      }
      return {};
    });
  } catch (error) {
    console.log('list documents error', error);
    return null;
  }
};

module.exports = {
  initialDatabases,
  getProjects,
  getAllDocuments,
};
