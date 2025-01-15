import { POIs, poiColors } from "./objectData.js";
import { canvas, ctx } from "./canvas.js";
import { vehicle } from "./vehicle.js"; // Ensure vehicle is imported

export function drawPOIs(ctx) {
    POIs.forEach((poi) => {
      const screenX = ctx.canvas.width / 2 + (poi.x - vehicle.x);
      const screenY = ctx.canvas.height / 2 + (poi.y - vehicle.y);
  
      // Only draw POIs within visible screen bounds
      if (screenX >= 0 && screenX <= ctx.canvas.width && screenY >= 0 && screenY <= ctx.canvas.height) {
        ctx.fillStyle = poi.type === "enemy" ? "red" : poi.type === "friendly" ? "green" : "yellow";
        ctx.beginPath();
        ctx.arc(screenX, screenY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(poi.name, screenX + 10, screenY - 10);
      }
    });
  }
  
