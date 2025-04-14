// Preload audio files
const clickSound = new Audio('sounds/click.wav');
const loginSound = new Audio('sounds/login.wav');
const signupSound = new Audio('sounds/sign_up.wav');
const typingSound = new Audio('sounds/typing.wav');

let typingTimeout = null; // To manage the typing sound duration

// Function to play sound safely
function playSound(audioElement) {
    // Reset playback position and play
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.log("Audio playback prevented:", error);
    });
}

// Function to play typing sound with duration limit
function playTypingSound() {
    // Clear any existing timeout to reset the 0.5s duration
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    // Play the sound if it's not already playing or just finished
    if (typingSound.paused || typingSound.ended) {
        playSound(typingSound);
    }

    // Set a timeout to pause the sound after 0.5 seconds
    typingTimeout = setTimeout(() => {
        typingSound.pause();
        typingSound.currentTime = 0; // Reset for next play
    }, 500); // 500 milliseconds = 0.5 seconds
}

// Function to play bot typing sound with longer duration
function playBotTypingSound() {
    // Clear any existing timeout
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    // Play the sound if it's not already playing or just finished
    if (typingSound.paused || typingSound.ended) {
        playSound(typingSound);
    }

    // Set a longer timeout for bot typing (2 seconds)
    typingTimeout = setTimeout(() => {
        typingSound.pause();
        typingSound.currentTime = 0;
    }, 2000); // 2000 milliseconds = 2 seconds
}

// General click sound listener
document.addEventListener('click', function(event) {
    const target = event.target;
    // Check if the clicked element is a button or a link
    const isButton = target.matches('button');
    const isLink = target.matches('a');
    const isNavItem = target.closest('.nav-links li'); // Add this line to catch navbar items
    const isNavbarLink = target.closest('nav') && (isLink || isNavItem); // Check if the link is inside a <nav> element

    // Determine if it's the LOGIN or SIGN UP button (using text content as fallback)
    const isLoginButton = isButton && target.textContent.trim().toUpperCase() === 'LOGIN';
    const isSignupButton = isButton && target.textContent.trim().toUpperCase() === 'SIGN UP';

    // Play general click sound for buttons (excluding login/signup) and all navbar links
    if ((isButton && !isLoginButton && !isSignupButton) || isNavbarLink) {
        playSound(clickSound);
    }
    // Specific sounds for LOGIN/SIGNUP are handled by their own listeners
}, true);

// Specific listener for LOGIN button click
document.addEventListener('click', function(event) {
    if (event.target.matches('button') && event.target.textContent.trim().toUpperCase() === 'LOGIN') {
        playSound(loginSound);
    }
});

// Specific listener for SIGN UP button click
document.addEventListener('click', function(event) {
    if (event.target.matches('button') && event.target.textContent.trim().toUpperCase() === 'SIGN UP') {
        playSound(signupSound);
    }
});

// Typing sound listener for input fields (on keydown for better control)
document.addEventListener('keydown', function(event) {
    // Check if the event target is an input or textarea and not during signup click
    if ((event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') && 
        !event.target.closest('.signup-form')) {
        if (event.key !== ' ' && event.key !== 'Spacebar') {
            playTypingSound();
        } else {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
                typingSound.pause();
                typingSound.currentTime = 0;
            }
        }
    }
});

// Hover sound listener for team member names in about_us.html
document.addEventListener('mouseover', function(event) {
    if (event.target.matches('.team-member-name-hover')) {
        playSound(loginSound); // Play login sound on hover
    }
});

// Improved bot typing sound handler
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('typing')) {
            // Start playing sound for bot typing
            playBotTypingSound();
            
            // Keep playing the sound while typing
            let typingInterval = setInterval(() => {
                if (!mutation.target.classList.contains('typing')) {
                    clearInterval(typingInterval);
                    typingSound.pause();
                    typingSound.currentTime = 0;
                } else {
                    playBotTypingSound();
                }
            }, 500);
        } else {
            // Stop sound when typing animation ends
            typingSound.pause();
            typingSound.currentTime = 0;
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        }
    });
});

// Start observing bot messages for typing with improved configuration
document.addEventListener('DOMContentLoaded', () => {
    const botMessages = document.querySelectorAll('.bot-message, .terminal-text');
    botMessages.forEach(message => {
        observer.observe(message, { 
            attributes: true, 
            attributeFilter: ['class'],
            subtree: false,
            childList: false
        });
    });
});

// Note: The selectors for LOGIN and SIGN UP buttons might need adjustment
// based on the actual HTML structure (e.g., using IDs like #login-btn, #signup-btn).
// If buttons don't have unique identifiers, the text content check is a fallback.