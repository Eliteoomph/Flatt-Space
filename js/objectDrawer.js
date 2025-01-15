import { POIs, poiColors } from "./objectData.js";
import { canvas, ctx } from "./canvas.js";
import { vehicle } from "./vehicle.js"; // Ensure vehicle is imported

export function drawObjects() { // Match your existing naming convention
  POIs.forEach((poi) => {
    const screenX = canvas.width / 2 + (poi.x - vehicle.x);
    const screenY = canvas.height / 2 + (poi.y - vehicle.y);

    if (
      screenX >= 0 &&
      screenX <= canvas.width &&
      screenY >= 0 &&
      screenY <= canvas.height
    ) {
      ctx.fillStyle = poiColors[poi.type] || "white";
      ctx.beginPath();
      ctx.arc(screenX, screenY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText(poi.name, screenX + 10, screenY - 10);
    }
  });
}
