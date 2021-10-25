const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://myfirebase-1c0da-default-rtdb.firebaseio.com',
});

const db = admin.firestore();

const listCollections = async () => {
  const snapshots = await db.listCollections();
  snapshots.forEach((snapshot) => console.log(snapshot.path));
};

module.exports = {
  listCollections,
};
