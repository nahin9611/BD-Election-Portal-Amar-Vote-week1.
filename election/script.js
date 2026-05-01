/**
 * NATIONAL E-VOTING SYSTEM - LOGIC CORE V5.0
 * Features: Dual-Ballot State Management, NID Persistence, and UI Transitions
 */

// Global State
let voterSession = null; // Stores NID and Name after login
let currentElectionType = null; // NEW: Stores 'national' or 'chairman'
let currentVote = {
    symbol: null,
    referendum: null
};

// --- 1. UI NAVIGATION CONTROLLER ---

function showSection(id) {
    // Hide all sections with a fade-out feel
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
    });
    // Reveal target section
    const target = document.getElementById(id);
    target.classList.remove('hidden');
    
    // Auto-scroll to top for better UX on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(type) {
    const isLogin = type === 'login';
    document.getElementById('loginForm').classList.toggle('hidden', !isLogin); 
    document.getElementById('signupForm').classList.toggle('hidden', isLogin);
    
    // Update active tab styling
    document.getElementById('tab-login').classList.toggle('active', isLogin);
    document.getElementById('tab-signup').classList.toggle('active', !isLogin);
}

// --- 2. AUTHENTICATION LOGIC (MongoDB Integration) ---

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('regName').value,
        voterId: document.getElementById('regId').value,
        pin: document.getElementById('regPin').value
    };

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        
        if (data.success) {
            alert("✅ Registration Successful! Please login with your NID.");
            switchTab('login');
        } else {
            alert("❌ NID Already Registered.");
        }
    } catch (err) {
        alert("⚠️ Server connection error. Please try again.");
    }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        voterId: document.getElementById('loginId').value,
        pin: document.getElementById('loginPin').value
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (data.success) {
            if (data.voter.hasVoted) {
                alert("🚫 This NID has already cast a vote.");
            } else {
                // Store session and move to ELECTION SELECTION screen
                voterSession = data.voter;
                showSection('page-election-type'); // CHANGED HERE
            }
        } else {
            alert("❌ Invalid NID or PIN.");
        }
    } catch (err) {
        alert("⚠️ Cannot connect to the secure server.");
    }
});

// --- 3. VOTING FLOW & STATE ---

// NEW: Handle Election Choice
function setElectionType(type) {
    currentElectionType = type;
    showSection('page-welcome'); // Move to rules after selection
}

// Enable 'Start' button only after agreement
document.getElementById('agreeCheck').addEventListener('change', function() {
    document.getElementById('startVoteBtn').disabled = !this.checked;
});

document.getElementById('startVoteBtn').onclick = () => showSection('page-ballot');

// Phase 1: Select Candidate Symbol
function selectSymbol(element, name) {
    currentVote.symbol = name;
    
    // Visual Highlight
    document.querySelectorAll('.symbol-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Reveal Next Phase Button
    const nextBtn = document.getElementById('nextToRefBtn');
    nextBtn.classList.remove('hidden');
    
    // DYNAMIC BRANCHING LOGIC
    if (currentElectionType === 'chairman') {
        nextBtn.innerText = "REVIEW FINAL BALLOT";
        nextBtn.onclick = () => {
            currentVote.referendum = "N/A"; // Skip referendum
            setupConfirmationScreen();
        };
    } else {
        nextBtn.innerText = "CONTINUE TO REFERENDUM";
        nextBtn.onclick = () => showSection('page-referendum');
    }
}

// Phase 2: Cast Referendum Vote (National Only)
function castReferendum(choice) {
    currentVote.referendum = choice;
    setupConfirmationScreen();
}

// NEW: Helper function to populate confirmation screen
function setupConfirmationScreen() {
    document.getElementById('resName').innerText = voterSession.name;
    document.getElementById('resId').innerText = voterSession.voterId;
    document.getElementById('resSymbol').innerText = currentVote.symbol;
    document.getElementById('resRef').innerText = currentVote.referendum;
    
    showSection('page-confirm');
}

// --- 4. FINAL ENCRYPTION & SUBMISSION ---

document.getElementById('finalSubmitBtn').onclick = async () => {
    // Show loading state on button
    const btn = document.getElementById('finalSubmitBtn');
    btn.innerText = "SUBMITTING SECURELY...";
    btn.disabled = true;

    // Payload now includes the electionType!
    const payload = {
        voterId: voterSession.voterId,
        symbol: currentVote.symbol,
        referendum: currentVote.referendum,
        electionType: currentElectionType // NEW ADDITION
    };

    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (data.success) {
            // Show the premium success overlay
            document.getElementById('successOverlay').classList.remove('hidden');
        } else {
            alert("❌ Error: Vote could not be recorded. Redirecting...");
            location.reload();
        }
    } catch (err) {
        alert("⚠️ Network Failure. Your vote was not saved.");
        location.reload();
    }
};
