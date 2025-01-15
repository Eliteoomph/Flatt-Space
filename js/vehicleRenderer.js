// vehicleRenderer.js
import { vehicle } from "./vehicle.js";

export function drawVehicle(ctx) {
  if (!ctx) {
    console.error("Context (ctx) is not defined in drawVehicle");
    return;
  }

  ctx.save();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2); // Center the vehicle
  ctx.rotate(vehicle.angle); // Rotate based on the vehicle's angle

  const bodyLength = 30;
  const bodyWidth = 12;

  // Core Ship Body
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.moveTo(0, -bodyLength / 2); // Nose (top)
  ctx.lineTo(bodyWidth / 2, bodyLength / 2); // Right wing tip
  ctx.lineTo(bodyWidth / 4, bodyLength / 3); // Right inner curve
  ctx.lineTo(-bodyWidth / 4, bodyLength / 3); // Left inner curve
  ctx.lineTo(-bodyWidth / 2, bodyLength / 2); // Left wing tip
  ctx.closePath();
  ctx.fill();

  // Cockpit
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(0, -bodyLength / 4, bodyWidth / 4, 0, Math.PI * 2); // Positioned centrally on the body
  ctx.fill();

  // Thruster Base
  ctx.fillStyle = "gray";
  const thrusterWidth = 6;
  const thrusterLength = 10;
  ctx.fillRect(-bodyWidth / 3 - thrusterWidth, bodyLength / 3, thrusterWidth, thrusterLength); // Left thruster base
  ctx.fillRect(bodyWidth / 3, bodyLength / 3, thrusterWidth, thrusterLength); // Right thruster base

  // Thruster Burn Effects
  const burnWidth = 6;
  const burnLength = Math.random() * 15 + 10; // Flickering length
  const offsetX = bodyWidth / 3 + thrusterWidth / 2; // Align with thruster base
  const offsetY = bodyLength / 3 + thrusterLength; // Distance from the back of the ship

  ctx.fillStyle = `rgba(255, 69, 0, ${Math.random() * 0.8 + 0.2})`; // Flickering red-orange
  ctx.beginPath();
  ctx.moveTo(-offsetX - burnWidth / 2, offsetY); // Left burn
  ctx.lineTo(-offsetX, offsetY + burnLength); // Burn tip
  ctx.lineTo(-offsetX + burnWidth / 2, offsetY); // Right burn
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(offsetX - burnWidth / 2, offsetY); // Right burn
  ctx.lineTo(offsetX, offsetY + burnLength); // Burn tip
  ctx.lineTo(offsetX + burnWidth / 2, offsetY); // Left burn
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
