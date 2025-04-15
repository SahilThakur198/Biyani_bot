// Preload audio files
const clickSound = new Audio('sounds/click.wav');
const loginSound = new Audio('sounds/login.wav');
const signupSound = new Audio('sounds/sign_up.wav');
const typingSound = new Audio('sounds/user-typing.mp3');
const botTypingSound = new Audio('sounds/typing.wav');

// Function to play sound safely
function playSound(audioElement) {
    // Reset playback position and play
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.log("Audio playback prevented:", error);
    });
}

// General click sound listener
document.addEventListener('click', function(event) {
    const target = event.target;
    const isButton = target.matches('button');
    const isLink = target.matches('a');
    const isNavItem = target.closest('.nav-links li');
    const isNavbarLink = target.closest('nav') && (isLink || isNavItem);

    const isLoginButton = isButton && target.textContent.trim().toUpperCase() === 'LOGIN';
    const isSignupButton = isButton && target.textContent.trim().toUpperCase() === 'SIGN UP';

    if ((isButton && !isLoginButton && !isSignupButton) || isNavbarLink) {
        playSound(clickSound);
    }
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

// Hover sound listener for team member names in about_us.html
document.addEventListener('mouseover', function(event) {
    if (event.target.matches('.team-member-name-hover')) {
        playSound(loginSound);
    }
});

// Typing sound handling with debounce
let typingTimeout;
function handleTypingSound() {
    if (typingSound.paused) {
        playSound(typingSound);
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typingSound.pause();
        typingSound.currentTime = 0;
    }, 100); // Adjust this value to control how long the sound plays after last keypress
}

// Add event listeners for typing sound
document.addEventListener('input', function(event) {
    if (event.target.matches('input[type="text"], input[type="email"], input[type="password"], textarea') || 
        event.target.classList.contains('chatbot-input')) {
        handleTypingSound();
    }
});

// Bot typing sound handling
let botTypingTimeout;
function handleBotTypingSound() {
    if (botTypingSound.paused) {
        playSound(botTypingSound);
    }
    clearTimeout(botTypingTimeout);
    botTypingTimeout = setTimeout(() => {
        botTypingSound.pause();
        botTypingSound.currentTime = 0;
    }, 100);
}

// Function to start bot typing sound
function startBotTypingSound() {
    handleBotTypingSound();
    botTypingInterval = setInterval(handleBotTypingSound, 150);
}

// Function to stop bot typing sound
function stopBotTypingSound() {
    clearInterval(botTypingInterval);
    botTypingSound.pause();
    botTypingSound.currentTime = 0;
}