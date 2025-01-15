// Background music setup
const backgroundMusic = new Audio("../sounds/background.mp3");
backgroundMusic.loop = true; // Loop the music
backgroundMusic.volume = 0.1; // Adjust volume as needed
let musicPlaying = false; // Track music state

// Shooting sound effect
const pewSound = new Audio("../sounds/pew.mp3");
pewSound.volume = 0.7; // Adjust volume for shooting sound

// Debugging audio load
backgroundMusic.addEventListener("canplaythrough", () => {
  console.log("Background music loaded successfully!");
});

pewSound.addEventListener("canplaythrough", () => {
  console.log("Pew sound loaded successfully!");
});

// Function to start playing music
function playMusic() {
  if (!musicPlaying) {
    backgroundMusic.play();
    musicPlaying = true;
  }
}

// Function to pause music
function pauseMusic() {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
  }
}

// Function to stop music completely
function stopMusic() {
  if (musicPlaying) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset to the beginning
    musicPlaying = false;
  }
}

// Function to play shooting sound
function playShootingSound() {
  pewSound.currentTime = 0; // Reset sound
  pewSound.play();
}

// Export functions for use in other files
export { playMusic, pauseMusic, stopMusic, playShootingSound };
