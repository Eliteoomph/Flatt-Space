import { vehicle } from "./vehicle.js";
import { ctx } from "./canvas.js";

export function drawCoordinates() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Coordinates: (${Math.floor(vehicle.x)}, ${Math.floor(vehicle.y)})`, 10, 20);
}
