import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqJ6JYiZk8dW2pRrO1lKWcdexXCzWerXI",
    authDomain: "pantry-tracker-b0a79.firebaseapp.com",
    projectId: "pantry-tracker-b0a79",
    storageBucket: "pantry-tracker-b0a79.appspot.com",
    messagingSenderId: "245037509942",
    appId: "1:245037509942:web:8c079d3e5ea31d0620d797"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};