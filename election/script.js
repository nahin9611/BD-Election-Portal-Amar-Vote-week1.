
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
