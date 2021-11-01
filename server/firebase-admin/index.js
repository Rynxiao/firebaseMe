/* eslint-disable @typescript-eslint/naming-convention */
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const getDatabase = (serviceAccountKey, isDefault) => {
  const projectId = serviceAccountKey.project_id;
  const config = {
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
  };

  if (isDefault) {
    admin.initializeApp(config);
  } else {
    admin.initializeApp(config, projectId);
  }
  return admin.firestore();
};

const listCollections = async (serviceAccountKey, isDefault) => {
  try {
    const db = getDatabase(serviceAccountKey, isDefault);
    const snapshots = await db.listCollections();

    return snapshots.map((snapshot) => {
      const { path } = snapshot;
      return { id: uuidv4(), name: path };
    });
  } catch (error) {
    console.log('list collections error', error);
    return null;
  }
};

module.exports = {
  listCollections,
};
