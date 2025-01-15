import { updateVehicle } from "./vehicle.js";
import { drawVehicle } from "./vehicleRenderer.js";
import { fireWeapon, updateLasers, drawLasers } from "./weapons.js";
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

// Fire weapon on spacebar press
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    fireWeapon(); // Trigger laser firing
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

  // Draw lasers (fired shots)
  updateLasers(); // Update laser positions
  drawLasers(ctx); // Draw laser effects

  // Draw vehicle
  drawVehicle(ctx);

  // Draw overlay/UI elements
  drawCoordinates(ctx);
}

// Main game loop
function gameLoop() {
  updateVehicle(); // Update vehicle movement and logic
  draw(); // Draw all elements
  requestAnimationFrame(gameLoop); // Loop
}

// Start the game loop
gameLoop();
