// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfO3C7YQvGkZL-oPrwSfyvZqQNmlauDk8",
  authDomain: "streamify-6103a.firebaseapp.com",
  projectId: "streamify-6103a",
  storageBucket: "streamify-6103a.appspot.com",
  messagingSenderId: "41551223776",
  appId: "1:41551223776:web:7425d11ee50c0200032985",
  measurementId: "G-CVSHXE3GZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);