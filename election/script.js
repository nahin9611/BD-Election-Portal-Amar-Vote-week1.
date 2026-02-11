// 03: Core Navigation & Form Validation by Nahin 1401.....
// Handle the "Login" logic and data validation before anything is sent to the server. File:
function showSignup() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('signup-box').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
}

function login() {
    const nid = document.getElementById('nid').value;
    const pin = document.getElementById('pin').value;

    // Validation Rules
    if (nid.length !== 8) {
        alert("⚠️ Access Denied: NID must be exactly 8 digits.");
        return;
    }
    if (pin.length !== 4) {
        alert("⚠️ Access Denied: PIN must be exactly 4 digits.");
        return;
    }

    // Success Simulation for Week 1
    alert("✅ Identity Verified. Opening Digital Ballot.");
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('vote-section').style.display = 'block';
}



// 04: Ballot Submission Logic
//Finalize the "Cast Vote" logic to ensure the user selected everything. by nahin 1401
function castVote() {
    const selectedSymbol = document.querySelector('input[name="symbol"]:checked');
    const selectedRef = document.querySelector('input[name="referendum"]:checked');

    if (!selectedSymbol || !selectedRef) {
        alert("⚠️ Error: Please complete all sections of the ballot.");
        return;
    }

    alert(`🗳️ Success!\nCandidate: ${selectedSymbol.value}\nPolicy: ${selectedRef.value}\nThank you for voting.`);
    
    // Auto-reload to simulate session end
    setTimeout(() => { location.reload(); }, 2000);
}



