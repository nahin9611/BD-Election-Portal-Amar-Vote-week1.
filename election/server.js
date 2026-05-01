const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/nationalElectionDB')
    .then(() => console.log("💎 SECURE: Database Connected"))
    .catch(err => console.error("🛑 Connection Error:", err));

// 2. SCHEMAS
// Existing Voter Schema (Now also tracks which election they participated in)
const Voter = mongoose.model('Voter', new mongoose.Schema({
    name: String,
    voterId: { type: String, unique: true },
    pin: String,
    hasVoted: { type: Boolean, default: false },
    electionType: { type: String, default: null }, // 'national' or 'chairman'
    votedSymbol: { type: String, default: null },
    referendumVote: { type: String, default: null }
}));

// NEW: Separate Collection for Chairman Results to keep them independent
const ChairmanVote = mongoose.model('ChairmanVote', new mongoose.Schema({
    voterId: String,
    symbol: String,
    timestamp: { type: Date, default: Date.now }
}));

// 3. API ROUTES

// Results API for Charts (Updated to handle both)
app.get('/api/admin/results', async (req, res) => {
    try {
        const type = req.query.type || 'national';
        
        if (type === 'chairman') {
            const symbolCounts = await ChairmanVote.aggregate([
                { $group: { _id: "$symbol", count: { $sum: 1 } } }
            ]);
            return res.json({ success: true, symbolCounts, referendumCounts: [] });
        }

        // Default: National Election Results
        const symbolCounts = await Voter.aggregate([
            { $match: { hasVoted: true, electionType: 'national' } },
            { $group: { _id: "$votedSymbol", count: { $sum: 1 } } }
        ]);
        const referendumCounts = await Voter.aggregate([
            { $match: { hasVoted: true, electionType: 'national' } },
            { $group: { _id: "$referendumVote", count: { $sum: 1 } } }
        ]);
        res.json({ success: true, symbolCounts, referendumCounts });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.post('/api/signup', async (req, res) => {
    try { const v = new Voter(req.body); await v.save(); res.json({success:true}); }
    catch(e) { res.status(400).json({success:false}); }
});

app.post('/api/login', async (req, res) => {
    const v = await Voter.findOne({ voterId: req.body.voterId, pin: req.body.pin });
    res.json({ success: !!v, voter: v });
});

// UPDATED VOTE ROUTE: Handles the split logic
app.post('/api/vote', async (req, res) => {
    const { voterId, symbol, referendum, electionType } = req.body;
    
    try {
        if (electionType === 'chairman') {
            // 1. Save to Chairman specific collection
            const cVote = new ChairmanVote({ voterId, symbol });
            await cVote.save();
            
            // 2. Mark voter as having voted in the main Voter records
            await Voter.findOneAndUpdate({ voterId }, { hasVoted: true, electionType: 'chairman' });
        } else {
            // National Election logic (same as before)
            await Voter.findOneAndUpdate({ voterId }, { 
                hasVoted: true, 
                electionType: 'national',
                votedSymbol: symbol, 
                referendumVote: referendum 
            });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// 4. SERVING FILES
app.use(express.static('public'));

// UPDATED RESET ROUTE: Wipes both collections
app.get('/api/admin/system-reset', async (req, res) => {
    try {
        await Voter.deleteMany({}); 
        await ChairmanVote.deleteMany({}); // Also clear chairman data
        res.send(`
            <div style="font-family:sans-serif; text-align:center; margin-top:50px;">
                <h1 style="color: #2ecc71;">✅ Total System Wipe Complete</h1>
                <p>National and Chairman databases are now empty.</p>
                <a href="/admin.html">Back to Dashboard</a>
            </div>
        `);
    } catch (err) {
        res.status(500).send("Reset failed: " + err.message);
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ✅ SERVER ACTIVE
    💻 On PC: http://192.168.0.106:3000
    📱 VOTING PAGE (Mobile): http://192.168.0.106:3000
    📱 On iPhone: http://192.168.0.106:3000/admin.html
    `);
});
