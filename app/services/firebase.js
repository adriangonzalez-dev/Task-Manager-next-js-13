// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArjjRs-LYqKboR_uZYti4tuBnPjxKV4ZQ",
  authDomain: "task-manager-bb10d.firebaseapp.com",
  projectId: "task-manager-bb10d",
  storageBucket: "task-manager-bb10d.appspot.com",
  messagingSenderId: "388504371861",
  appId: "1:388504371861:web:00c50c20f7a7b50813919c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
  auth,
  GoogleAuthProvider,
  signInWithPopup
}