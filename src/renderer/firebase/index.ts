// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { Indentity, Response } from 'renderer/states/types';

const firebaseConfig = {
  apiKey: 'AIzaSyBGLW2Er3TfIIBk_PSuXM6gk72Z1FidKJM',
  authDomain: 'myfirebase-1c0da.firebaseapp.com',
  databaseURL: 'https://myfirebase-1c0da-default-rtdb.firebaseio.com',
  projectId: 'myfirebase-1c0da',
  storageBucket: 'myfirebase-1c0da.appspot.com',
  messagingSenderId: '845894948539',
  appId: '1:845894948539:web:dbb6992fa02c1d58673b9e',
  measurementId: 'G-C9JCF2RSP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getCollection = async <T extends Indentity>(
  collectionName: string
): Promise<Response<T[]>> => {
  try {
    const col = collection(db, collectionName);
    const snapshots = await getDocs(col);
    const list = snapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
    return { loading: false, data: list };
  } catch (error) {
    const { message } = error as FirebaseError;
    return { loading: false, data: [], error: message };
  }
};

export default app;
