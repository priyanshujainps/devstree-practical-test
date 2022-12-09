// Import the functions you need from the SDKs you need
import { initializeApp,  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDzeXNwx9iP0g5G8t23lXwPTeTIhIJAL8",
  authDomain: "devstree-practical-test.firebaseapp.com",
  projectId: "devstree-practical-test",
  storageBucket: "devstree-practical-test.appspot.com",
  messagingSenderId: "394922009959",
  appId: "1:394922009959:web:3db56d8cfb3f8e7e93fbc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);