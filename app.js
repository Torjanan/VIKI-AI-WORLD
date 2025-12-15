// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Firebase config (tumhara)
const firebaseConfig = {
  apiKey: "AIzaSyBn9doD99wq5gU8kCVu3g8Kz16iabZqGKA",
  authDomain: "viki-49b73.firebaseapp.com",
  projectId: "viki-49b73",
  storageBucket: "viki-49b73.firebasestorage.app",
  messagingSenderId: "92668810768",
  appId: "1:92668810768:web:d0029f292bbf16e94d5c95"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 ADMIN EMAIL (CHANGE ONLY THIS IF NEEDED)
const ADMIN_EMAIL = "admin@viki.com";

// Login
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.email === ADMIN_EMAIL) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Signup
window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created. Now login.");
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Protect pages
onAuthStateChanged(auth, (user) => {
  if (!user && location.pathname.includes("admin")) {
    window.location.href = "index.html";
  }
});
