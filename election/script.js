
//Implement secure UI navigation controller and global session state by nahin 1401
// --- 1. GLOBAL STATE & NAVIGATION ---
let voterSession = null; 
let currentVote = { symbol: null, referendum: null };

function showSection(id) {
    // Security: Hide all sections to prevent overlaying screens
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
    });
    const target = document.getElementById(id);
    target.classList.remove('hidden');
    
    // Smooth UX for mobile users
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(type) {
    const isLogin = type === 'login';
    document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
    document.getElementById('signupForm').classList.toggle('hidden', isLogin);
    document.getElementById('tab-login').classList.toggle('active', isLogin);
    document.getElementById('tab-signup').classList.toggle('active', !isLogin);
}


// --- 2. AUTHENTICATION (Matching Lead's Week 3 Backend) ---
//Integrate Authentication logic with NID verification and fraud alerts
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
            alert("✅ Registration Successful!");
            switchTab('login');
        } else {
            alert("❌ NID Already Registered.");
        }
    } catch (err) {
        alert("⚠️ Server connection error.");
    }
});

// Handle Login with Double-Voting Protection
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
                alert("🚫 FRAUD ALERT: This NID has already cast a vote.");
            } else {
                voterSession = data.voter;
                showSection('page-welcome');
            }
        } else {
            alert("❌ Invalid NID or PIN.");
        }
    } catch (err) {
        alert("⚠️ Secure server connection failed.");
    }
});
