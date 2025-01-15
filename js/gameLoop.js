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
    isGameFocused = false;
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

  // Draw lasers
  drawLasers(ctx);

  // Draw vehicle
  drawVehicle(ctx);

  // Draw overlay/UI elements
  drawCoordinates(ctx);
}

// Main game loop
function gameLoop() {
  if (!isGameFocused) {
    requestAnimationFrame(gameLoop); // Continue the loop but skip updates
    return;
  }

  updateVehicle(); // Update vehicle movement and logic
  updateLasers(); // Update laser positions
  draw(); // Draw all elements
  requestAnimationFrame(gameLoop); // Loop
}

// Start the game loop
gameLoop();
