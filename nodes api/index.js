const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const app = express();

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyBq4K43iQMKmgZEBwnB-Cw9-gRa1JMzdsU",
  authDomain: "cybers-71047.firebaseapp.com",
  projectId: "cybers-71047",
  storageBucket: "cybers-71047.firebasestorage.app",
  messagingSenderId: "57374804742",
  appId: "1:57374804742:web:45187dc4e71acd93376c87",
  measurementId: "G-T0FXJTV5TB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
