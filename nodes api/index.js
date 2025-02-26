const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
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

// API endpoint to fetch all events
app.get('/api/events', async (req, res) => {
  try {
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);
    const events = [];
    eventsSnapshot.forEach((doc) => {
      events.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// API endpoint to create a new event (admin only)
app.post('/api/events/create', async (req, res) => {
  try {
    // Check if user is admin
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' });
    }

    // Basic validation of required fields
    const eventData = req.body;
    if (!eventData.title || !eventData.date || !eventData.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const eventsCollection = collection(db, 'events');
    const newEvent = {
      title: eventData.title,
      date: eventData.date,
      description: eventData.description,
      createdAt: new Date().toISOString(),
      // Add any other fields you want to store
    };

    await addDoc(eventsCollection, newEvent);
    
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.get('/', (req, res) => {
  res.send('You are not allowed to access this page');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
