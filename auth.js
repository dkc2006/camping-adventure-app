document.addEventListener("DOMContentLoaded", function() {
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const closeButtons = document.querySelectorAll('.close');
    const logoutButton = document.getElementById('logout-button');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginButton.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    signupButton.addEventListener('click', function() {
        signupModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUser = localStorage.getItem(username);
        if (storedUser && storedUser === password) {
            localStorage.setItem('loggedInUser', username);
            loginModal.style.display = 'none';
            updateUI();
        } else {
            alert('Invalid username or password');
        }
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        if (localStorage.getItem(username)) {
            alert('Username already exists');
        } else {
            localStorage.setItem(username, password);
            alert('Account created successfully');
            signupModal.style.display = 'none';
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        updateUI();
    });

    function updateUI() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            loginButton.style.display = 'none';
            signupButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
        } else {
            loginButton.style.display = 'inline-block';
            signupButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
        }
    }

    updateUI();
});
