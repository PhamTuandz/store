import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyA7qy9HRxfVVFMctiUEeEeEZ2uvNzUXZsE",
  authDomain: "store-8a88e.firebaseapp.com",
  projectId: "store-8a88e",
  storageBucket: "store-8a88e.appspot.com",
  messagingSenderId: "925772699637",
  appId: "1:925772699637:web:6338f0d35c40a6d39772bc",
  measurementId: "G-982RCRWJBB",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
