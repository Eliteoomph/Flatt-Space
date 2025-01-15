import { playMusic, pauseMusic, playShootingSound } from "./audio.js";
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

// Key controls
const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

let musicPaused = false; // Track if music is paused

// Update vehicle logic
export function updateVehicle() {
  // Handle music pause toggle
  if (keys["Pause"]) {
    if (!musicPaused) {
      pauseMusic(); // Pause the music
      musicPaused = true;
    } else {
      playMusic(); // Resume the music
      musicPaused = false;
    }
    keys["Pause"] = false; // Prevent multiple triggers
  }

  // Movement logic (unaffected by music pause)
  // Rotate left
  if (keys["a"] || keys["A"]) {
    vehicle.angle -= vehicle.rotationSpeed;
  }

  // Rotate right
  if (keys["d"] || keys["D"]) {
    vehicle.angle += vehicle.rotationSpeed;
  }

  // Move forward
  if (keys["w"] || keys["W"]) {
    vehicle.speed = Math.min(vehicle.speed + vehicle.acceleration, vehicle.maxSpeed);
    if (!musicPaused) {
      playMusic(); // Start music if moving and not paused
    }
  } else {
    vehicle.speed = Math.max(vehicle.speed - vehicle.deceleration, 0);
  }

  // Toggle auto-drive
  if (keys["s"] || keys["S"]) {
    vehicle.autoDrive = !vehicle.autoDrive;
    keys["s"] = false;
  }

  // Auto-drive logic
  if (vehicle.autoDrive) {
    vehicle.speed = vehicle.maxSpeed;
  }

  // Update position
  vehicle.x += Math.cos(vehicle.angle - Math.PI / 2) * vehicle.speed;
  vehicle.y += Math.sin(vehicle.angle - Math.PI / 2) * vehicle.speed;

  // Stay within playfield bounds
  vehicle.x = Math.max(0, Math.min(vehicle.x, playfieldWidth));
  vehicle.y = Math.max(0, Math.min(vehicle.y, playfieldHeight));
}
