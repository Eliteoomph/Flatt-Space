import { canvas, ctx } from "./canvas.js";
import { drawObjects } from "./objectDrawer.js";

// Main function to handle object rendering
export function updateObjectDisplay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawObjects(); // Draw all objects (POIs, etc.)
    requestAnimationFrame(updateObjectDisplay); // Loop for continuous updates
}

// Start the display loop
updateObjectDisplay();
