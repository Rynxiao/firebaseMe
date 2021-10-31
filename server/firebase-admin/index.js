/* eslint-disable @typescript-eslint/naming-convention */
const admin = require('firebase-admin');

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
    const collections = snapshots.map((snapshot) => {
      const { id, path } = snapshot;
      return { id, path };
    });

    return collections;
  } catch (error) {
    console.log('list collections error', error);
    return null;
  }
};

listCollections();

module.exports = {
  listCollections,
};
