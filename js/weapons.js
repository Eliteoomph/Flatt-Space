import { vehicle } from "./vehicle.js";

let lasers = []; // Array to hold laser shots

// Fire a laser
export function fireWeapon() {
  lasers.push({
    x: vehicle.x,
    y: vehicle.y,
    angle: vehicle.angle,
    lifetime: 100, // Frames before disappearing
  });
}

// Update laser positions and filter expired lasers
export function updateLasers() {
  lasers = lasers.filter((laser) => {
    laser.x += Math.cos(laser.angle - Math.PI / 2) * 10; // Laser speed
    laser.y += Math.sin(laser.angle - Math.PI / 2) * 10;
    laser.lifetime -= 1; // Reduce lifetime
    return laser.lifetime > 0; // Keep lasers with remaining lifetime
  });
}

// Draw lasers on the canvas
export function drawLasers(ctx) {
  ctx.strokeStyle = "red"; // Laser color
  ctx.lineWidth = 2;

  lasers.forEach((laser) => {
    ctx.beginPath();
    ctx.moveTo(
      laser.x - Math.cos(laser.angle - Math.PI / 2) * 5,
      laser.y - Math.sin(laser.angle - Math.PI / 2) * 5
    );
    ctx.lineTo(
      laser.x + Math.cos(laser.angle - Math.PI / 2) * 10,
      laser.y + Math.sin(laser.angle - Math.PI / 2) * 10
    );
    ctx.stroke();
  });
}
