import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCxbrZp7SU9Pm6bhX1zF6C5aVR3K01Z_WY",
  authDomain: "store-74355.firebaseapp.com",
  databaseURL:
    "https://store-74355-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "store-74355",
  storageBucket: "store-74355.appspot.com",
  messagingSenderId: "399301337826",
  appId: "1:399301337826:web:433665be8618bb21a6b4bb",
  measurementId: "G-3WW3744854",
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)


export {db}