// 05: Server Initialization & Configuration by nahin 1401
//Initialize the backend environment and create the main server file
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Required for cross-device access later

const app = express();

// Middleware: Allows the server to understand JSON and serve HTML files
app.use(express.json());
app.use(cors()); 
app.use(express.static('public')); // Serves files from 'public' folder

const PORT = 3000;
const HOST = '0.0.0.0'; // Critical for Mobile Access (Week 3 prep)

// Start the Server
app.listen(PORT, HOST, () => {
    console.log(`
    🚀 ELECTION SERVER ONLINE
    --------------------------
    💻 Local Access: http://localhost:${PORT}
    📡 Network Access: http://[YOUR_PC_IP]:${PORT}
    `);
});
