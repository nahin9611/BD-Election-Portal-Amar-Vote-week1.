// Week 1 Logic: UI Switching Only (No API)
//Al Mamun 1245

// Function to switch between Login and Signup tabs
function switchTab(tabName) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('tab-login');
    const signupBtn = document.getElementById('tab-signup');

    if (tabName === 'login') {
        loginForm.classList.remove('hidden');
        loginForm.classList.add('active');
        signupForm.classList.add('hidden');
        
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    } else {
        signupForm.classList.remove('hidden');
        signupForm.classList.add('active');
        loginForm.classList.add('hidden');
        
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

// Temporary function to simulate login for demo
function tempLogin() {
    console.log("Login button clicked - Waiting for backend integration...");
    alert("This is a static prototype. Backend connection coming in Week 2!");

}
