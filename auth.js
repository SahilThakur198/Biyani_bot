document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function getLoggedInUser() {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
}

function updateNavigation() {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return; // Exit if nav links container not found

    const loggedIn = isLoggedIn();
    const user = getLoggedInUser();

    // Clear existing links except potentially the logo link if it's inside
    navLinksContainer.innerHTML = ''; // Clear previous links

    // Always add About Bot and About Us
    navLinksContainer.innerHTML += `<a href="Home.html" id="navHomeLink">About Bot</a>`; // Added ID
    navLinksContainer.innerHTML += `<a href="about_us.html">About Us</a>`;

    if (loggedIn && user) {
        // Logged-in state: Show user name and Logout link
        // Hide the "About Bot" link initially if it's the protected page
        const homeLink = navLinksContainer.querySelector('#navHomeLink');
        if (homeLink) homeLink.style.display = 'inline-block'; // Ensure it's visible when logged in

        navLinksContainer.innerHTML += `<span style="color: var(--text-secondary); margin-left: 2rem;">Welcome, ${user.fullName}</span>`;
        navLinksContainer.innerHTML += `<a href="#" id="logoutLink" style="margin-left: 1rem; color: var(--accent-2);">Logout</a>`;

        // Add event listener for logout
        const logoutLink = navLinksContainer.querySelector('#logoutLink');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    } else {
        // Logged-out state: Show Login and Sign Up links
        // Hide the "About Bot" link if it's the protected page
        const homeLink = navLinksContainer.querySelector('#navHomeLink');
        if (homeLink) homeLink.style.display = 'none'; // Hide Home link when logged out

        navLinksContainer.innerHTML += `<a href="login.html">Login</a>`;
        navLinksContainer.innerHTML += `<a href="signup.html">Sign Up</a>`;
    }

    // Re-attach mobile menu toggle if it exists and was cleared
    // This depends on the exact HTML structure, might need adjustment
    // If the toggle button is outside nav-links, this isn't needed.
    // If it's inside, we need to ensure it's still functional.
    // Assuming the toggle button is outside .nav-links based on provided HTML.
}


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    // Redirect to login page or index page after logout
    window.location.href = 'login.html';
}

// --- Protection for specific pages ---
function protectPage() {
    // Add this function call at the start of scripts on pages that require login (e.g., Home.html)
    if (!isLoggedIn()) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html'; // Redirect to login
    }
}
