const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON requests

// Available Routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes'));  // Uncommented for note handling

// Start server
app.listen(port, () => {
  console.log(`Notebook backend listening at http://localhost:${port}`);
});
