// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA6M8uxnajVK95wfWmgLgRABpZfh8Hm788",
  authDomain: "weather-app-408d7.firebaseapp.com",
  projectId: "weather-app-408d7",
  storageBucket: "weather-app-408d7.appspot.com",
  messagingSenderId: "342840623761",
  appId: "1:342840623761:web:4555d0abb63464814c7530",
  measurementId: "G-LD1W48TY7S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);