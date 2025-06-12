// Import the Express library for building the web server
const express = require('express');
// Import body-parser to parse JSON request bodies
const bodyParser = require('body-parser');
// Import the built-in 'fs' (file system) module for file operations
const fs = require('fs');
// Import the 'path' module for handling file paths
const path = require('path');
// Import 'cors' to handle Cross-Origin Resource Sharing (allows frontend to talk to backend)
const cors = require('cors');

// Create an Express application instance
const app = express();
// Define the port number for the server to listen on
const PORT = 3001; // Frontend (App.jsx) is configured to use port 3001

// Define the path to the history.json file
const HISTORY_FILE = path.join(__dirname, 'history.json');

// Middleware: Enable CORS for all origins
// This is crucial for local development where frontend (e.g., port 5173)
// needs to make requests to backend (e.g., port 3001).
app.use(cors());

// Middleware: Parse JSON request bodies
app.use(bodyParser.json());

// Function to read the history from history.json
const readHistory = () => {
  try {
    // Check if the history file exists
    if (!fs.existsSync(HISTORY_FILE)) {
      // If not, create it with initial empty data
      fs.writeFileSync(HISTORY_FILE, JSON.stringify({ history: [], lastResult: "" }, null, 2));
    }
    // Read the file content, parse it as JSON, and return
    const data = fs.readFileSync(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading history file:', error);
    // If there's an error (e.g., file corrupted), return empty data
    return { history: [], lastResult: "" };
  }
};

// Function to write history data to history.json
const writeHistory = (data) => {
  try {
    // Write the JSON data to the file, formatted with 2 spaces for readability
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing history file:', error);
  }
};

// --- API Endpoints ---

// GET /api/history: Get all calculation history
app.get('/api/history', (req, res) => {
  const historyData = readHistory();
  res.json(historyData); // Send the history data as a JSON response
});

// POST /api/history: Add a new calculation to history
app.post('/api/history', (req, res) => {
  const { expression, result } = req.body; // Extract expression and result from request body

  if (!expression || result === undefined || result === null) {
    // Basic validation for required fields
    return res.status(400).json({ message: 'Expression and result are required.' });
  }

  const historyData = readHistory();
  // Add the new entry to the history array
  historyData.history.push({ expression, result, timestamp: new Date().toISOString() });
  // Update the lastResult
  historyData.lastResult = result.toString(); // Ensure lastResult is a string
  writeHistory(historyData); // Save the updated history back to the file

  res.status(201).json({ message: 'Calculation saved successfully.', history: historyData.history });
});

// DELETE /api/history: Clear all calculation history
app.delete('/api/history', (req, res) => {
  // Overwrite the history file with empty data
  writeHistory({ history: [], lastResult: "" });
  res.status(200).json({ message: 'History cleared successfully.' });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`History will be saved to: ${HISTORY_FILE}`);
});