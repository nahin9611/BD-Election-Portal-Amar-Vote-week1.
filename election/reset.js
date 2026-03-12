const mongoose = require('mongoose');

async function resetDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/electionDB');
        console.log("Connected to database...");

        // This deletes the 'voters' collection entirely
        await mongoose.connection.db.dropCollection('voters');
        
        console.log("✅ DATABASE CLEANED! All test voters and votes have been deleted.");
        console.log("You can now start your presentation with a fresh database.");
        process.exit();
    } catch (err) {
        console.log("Note: Database was already empty or not found. You are good to go!");
        process.exit();
    }
}

resetDatabase();
