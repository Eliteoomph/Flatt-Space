import { canvas, ctx } from "./canvas.js";
import { POIs, poiColors } from "./objectData.js";
import { vehicle } from "./vehicle.js";

export function drawObjects() {
    POIs.forEach((poi) => {
        const dx = poi.x - vehicle.x; // X offset from vehicle
        const dy = poi.y - vehicle.y; // Y offset from vehicle

        // Calculate relative position for the object on the canvas
        const relativeX = canvas.width / 2 + dx; // Center canvas + offset
        const relativeY = canvas.height / 2 + dy;

        // Draw the object as a dot
        ctx.fillStyle = poiColors[poi.type] || "yellow";
        ctx.beginPath();
        ctx.arc(relativeX, relativeY, 5, 0, Math.PI * 2); // Small circle
        ctx.fill();

        // Display object name and coordinates
        ctx.font = "12px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`${poi.name}`, relativeX + 10, relativeY - 10);
        ctx.fillText(`(${poi.x.toFixed(0)}, ${poi.y.toFixed(0)})`, relativeX + 10, relativeY + 5);
    });
}
