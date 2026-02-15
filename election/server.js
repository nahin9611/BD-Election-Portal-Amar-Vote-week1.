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

// 2. SCHEMA
const Voter = mongoose.model('Voter', new mongoose.Schema({
    name: String,
    voterId: { type: String, unique: true },
    pin: String,
    hasVoted: { type: Boolean, default: false },
    votedSymbol: { type: String, default: null },
    referendumVote: { type: String, default: null }
}));

// 3. API ROUTES (Data Engine)

// Results API for Charts
app.get('/api/admin/results', async (req, res) => {
    try {
        const symbolCounts = await Voter.aggregate([
            { $match: { hasVoted: true } },
            { $group: { _id: "$votedSymbol", count: { $sum: 1 } } }
        ]);
        const referendumCounts = await Voter.aggregate([
            { $match: { hasVoted: true } },
            { $group: { _id: "$referendumVote", count: { $sum: 1 } } }
        ]);
        res.json({ success: true, symbolCounts, referendumCounts });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// Auth & Voting APIs
app.post('/api/signup', async (req, res) => {
    try { const v = new Voter(req.body); await v.save(); res.json({success:true}); }
    catch(e) { res.status(400).json({success:false}); }
});

app.post('/api/login', async (req, res) => {
    const v = await Voter.findOne({ voterId: req.body.voterId, pin: req.body.pin });
    res.json({ success: !!v, voter: v });
});

app.post('/api/vote', async (req, res) => {
    const { voterId, symbol, referendum } = req.body;
    await Voter.findOneAndUpdate({ voterId }, { hasVoted: true, votedSymbol: symbol, referendumVote: referendum });
    res.json({ success: true });
});

// 4. SERVING FILES
// ... (Your previous code above)

// 4. SERVING FILES
app.use(express.static('public'));

const PORT = 3000;
// We add '0.0.0.0' so your iPhone can "see" the PC
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ✅ SERVER ACTIVE
    💻 On PC: http://localhost:${PORT}
    📱 On iPhone: http://192.168.0.106:${PORT}/admin.html
    `);
});
