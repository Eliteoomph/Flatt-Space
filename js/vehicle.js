import { playMusic, pauseMusic } from "./audio.js";
import { playfieldWidth, playfieldHeight } from "./playfield.js";

// Vehicle data
export const vehicle = {
  x: playfieldWidth / 2,
  y: playfieldHeight / 2,
  angle: 0,
  speed: 0,
  maxSpeed: 2,
  acceleration: 0.1,
  deceleration: 0.05,
  rotationSpeed: 0.03,
  autoDrive: false,
};

// Prevent mouse inputs from affecting the game when outside the canvas
const canvas = document.getElementById("gameCanvas");
canvas.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Block unintended effects
});
canvas.addEventListener("mouseup", (e) => {
  e.preventDefault(); // Block unintended effects
});

const keys = {};
document.addEventListener("keydown", (e) => {
  // Ignore system keys or unrelated inputs
  if (e.key === "ContextMenu" || e.ctrlKey || e.altKey || e.metaKey) return;
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Prevent right-click menu from triggering game inputs
window.addEventListener("contextmenu", (e) => e.preventDefault());

let musicPaused = false; // Track if music is paused

export function updateVehicle() {
  // Pause music logic
  if (keys["Pause"]) {
    if (!musicPaused) {
      pauseMusic(); // Pause the music only
      musicPaused = true;
    } else {
      playMusic(); // Resume the music only
      musicPaused = false;
    }
    keys["Pause"] = false; // Prevent multiple toggles
  }

  // Toggle auto-drive
  if (keys["s"] || keys["S"]) {
    vehicle.autoDrive = !vehicle.autoDrive;
    keys["s"] = false; // Prevent multiple toggles
  }

  // Movement logic
  // Rotate left
  if (keys["a"] || keys["A"]) {
    vehicle.angle -= vehicle.rotationSpeed;
  }

  // Rotate right
  if (keys["d"] || keys["D"]) {
    vehicle.angle += vehicle.rotationSpeed;
  }

  // Move forward
  if (keys["w"] || keys["W"] || vehicle.autoDrive) {
    vehicle.speed = Math.min(vehicle.speed + vehicle.acceleration, vehicle.maxSpeed);
    if (!musicPaused) playMusic(); // Ensure music plays while moving unless paused
  } else {
    vehicle.speed = Math.max(vehicle.speed - vehicle.deceleration, 0);
  }

  // Update position
  vehicle.x += Math.cos(vehicle.angle - Math.PI / 2) * vehicle.speed;
  vehicle.y += Math.sin(vehicle.angle - Math.PI / 2) * vehicle.speed;

  // Stay within playfield bounds
  vehicle.x = Math.max(0, Math.min(vehicle.x, playfieldWidth));
  vehicle.y = Math.max(0, Math.min(vehicle.y, playfieldHeight));
}
