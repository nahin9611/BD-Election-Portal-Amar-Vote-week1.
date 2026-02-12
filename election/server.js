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


// 06: Database Connection & Schema Design
//Connect to MongoDB and define the "Voter" structure
// Connect to Local MongoDB Database
mongoose.connect('mongodb://127.0.0.1:27017/nationalElectionDB')
    .then(() => console.log("💎 DATABASE CONNECTED: Secure & Ready"))
    .catch(err => console.error("🛑 DB CONNECTION ERROR:", err));

// Define the Voter Model (The Blueprint)
const voterSchema = new mongoose.Schema({
    name: String,
    nid: { type: String, unique: true, required: true }, // NID must be unique
    pin: { type: String, required: true },
    hasVoted: { type: Boolean, default: false }, // Tracks voting status
    voteChoice: { type: String, default: null }, // Stores the Symbol choice
    referendumChoice: { type: String, default: null } // Stores Yes/No choice
});

const Voter = mongoose.model('Voter', voterSchema);
