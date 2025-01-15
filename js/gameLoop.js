import { updateVehicle } from "./vehicle.js";
import { drawVehicle } from "./vehicleRenderer.js";
import { drawLasers, updateLasers } from "./weapons.js";
import { drawGrid, drawStars, drawMiniMap } from "./canvas.js";
import { drawCoordinates } from "./coordinates.js";

// Initialize canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Track whether the game canvas is focused
let isGameFocused = true;

// Detect clicks on the canvas to focus the game
canvas.addEventListener("mousedown", () => {
  isGameFocused = true;
});

// Detect clicks elsewhere to blur the game
document.addEventListener("mousedown", (e) => {
  if (!canvas.contains(e.target)) {
    isGameFocused = true;
  }
});

// Main draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background elements
  drawGrid(ctx);
  drawStars(ctx);
  drawMiniMap(ctx);
  drawLasers(ctx);
  drawVehicle(ctx);
  drawCoordinates(ctx);
  drawPOIs(ctx);
  
}

// Initialize a flag to track whether the game is active
let isGameActive = false;

// Update isGameActive based on movement or interactions
function updateGameStatus() {
  isGameActive = vehicle.speed > 0 || vehicle.autoDrive; // Active if moving or in auto-drive
}

// Prevent right-click context menu only if the game is active
document.addEventListener("contextmenu", (e) => {
  if (isGameActive) {
    e.preventDefault(); // Block right-click only if the game is active
  }
});


// Main game loop
function gameLoop() {

  updateVehicle(); // Update vehicle movement and logic
  updateLasers(); // Update laser positions
  draw(); // Draw all elements
  requestAnimationFrame(gameLoop); // Loop
}

// Start the game loop
gameLoop();
