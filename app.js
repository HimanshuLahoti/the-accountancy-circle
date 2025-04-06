import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAthGjbqweU3uw6yh6yFdqQ99WdLzN7WSI",
  authDomain: "the-accountancy-circle.firebaseapp.com",
  projectId: "the-accountancy-circle",
  storageBucket: "the-accountancy-circle.firebasestorage.app",
  messagingSenderId: "530723066687",
  appId: "1:530723066687:web:5fc0a93351ff369333398a",
  measurementId: "G-62L4BWWBRC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert("Welcome, " + user.displayName + "!");
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};
