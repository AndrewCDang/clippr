// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeFKozgq3k6zsp7I2MdON1lyg-_0eZ1xQ",
  authDomain: "clippr-993d2.firebaseapp.com",
  projectId: "clippr-993d2",
  storageBucket: "clippr-993d2.appspot.com",
  messagingSenderId: "632603672087",
  appId: "1:632603672087:web:b5ee153ff95ef6fcd22652",
  measurementId: "G-9DQK8ZB6PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
s
export default firebase;