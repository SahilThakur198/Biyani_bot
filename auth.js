/**
 * Authentication Module
 * Handles user authentication state and navigation updates
 */

// Initialize auth state when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});

/**
 * Checks if a user is currently logged in
 * Verifies login status from localStorage
 * @returns {boolean} True if user is logged in, false otherwise
 */
function isLoggedIn() {
    const loginStatus = localStorage.getItem('isLoggedIn');
    return loginStatus === 'true';
}

/**
 * Retrieves currently logged in user data
 * @returns {Object|null} User object if found, null otherwise
 */
function getLoggedInUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Updates Navigation Links
 * Modifies navigation based on authentication state
 * Shows/hides appropriate links for logged in/out users
 */
function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const isUserLoggedIn = isLoggedIn();
    const currentUser = getLoggedInUser();
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename

    // Define base navigation links
    let baseLinks = [];
    if (isUserLoggedIn) {
        baseLinks = [
            { href: 'about_us.html', text: 'About Us' },
            { href: 'bot.html', text: 'Chat' },
            { href: 'home.html', text: 'About Bot' }, // Changed from Home.html to home.html
            { href: '#', text: 'Logout', onclick: 'logout()' }
        ];
    } else {
        baseLinks = [
            { href: 'about_us.html', text: 'About Us' },
            { href: 'login.html', text: 'Login' },
            { href: 'signup.html', text: 'Sign Up' }
        ];
    }

    // Filter out the link corresponding to the current page (case-insensitive comparison)
    const links = baseLinks.filter(link => link.href.toLowerCase() !== currentPage.toLowerCase());

    // Update DOM with new links
    navLinks.innerHTML = links.map(link => 
        `<a href="${link.href}" ${link.onclick ? `onclick="${link.onclick}"` : ''}>${link.text}</a>`
    ).join('');
}

/**
 * Handles user logout
 * Clears authentication state and redirects to login
 */
function logout() {
    // Clear auth data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    // Redirect to login
    window.location.href = 'login.html';
}
