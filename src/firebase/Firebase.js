// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDu6RAo2PxnSItC61UIH0CGGZ_26HSRDpg',
  authDomain: 'realtime-chat-app-12dab.firebaseapp.com',
  databaseURL: 'https://realtime-chat-app-12dab-default-rtdb.firebaseio.com/',
  projectId: 'realtime-chat-app-12dab',
  storageBucket: 'realtime-chat-app-12dab.appspot.com',
  messagingSenderId: '284964247975',
  appId: '1:284964247975:web:9d1b20617d15c82e57be82',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
