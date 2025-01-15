import { canvas, ctx } from "./canvas.js";

export function updateRadar() {
  // Example radar drawing logic
  ctx.save();
  ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
  ctx.fillRect(canvas.width - 100, 0, 100, 100); // Draw radar in the top-right corner
  ctx.restore();
}

// Call `updateRadar` in your game loop or as needed

const POIs = [
    { x: 5000, y: 4000, name: "Friendly Base", type: "friendly" },
    { x: 6000, y: 8000, name: "Enemy Ship", type: "enemy" },
    { x: 7000, y: 9000, name: "Resource Field", type: "default" },
    { x: 12000, y: 10000, name: "Mining Station", type: "friendly" },
    { x: 15000, y: 15000, name: "Alien Ruins", type: "enemy" },
    { x: 20000, y: 20000, name: "Supply Depot", type: "default" },
];

const poiColors = { default: "yellow", enemy: "red", friendly: "green" };

// Draw POIs relative to the vehicle's position
function drawPOIs() {
    POIs.forEach((poi) => {
        const dx = poi.x - vehicle.x; // X offset from vehicle
        const dy = poi.y - vehicle.y; // Y offset from vehicle

        // Calculate relative position for the POI on the canvas
        const relativeX = canvas.width / 2 + dx; // Center canvas + offset
        const relativeY = canvas.height / 2 + dy;

        // Draw the POI as a dot
        ctx.fillStyle = poiColors[poi.type] || "yellow";
        ctx.beginPath();
        ctx.arc(relativeX, relativeY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Display POI name and coordinates
        ctx.font = "12px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`${poi.name}`, relativeX + 10, relativeY - 10);
        ctx.fillText(`(${poi.x.toFixed(0)}, ${poi.y.toFixed(0)})`, relativeX + 10, relativeY + 5);
    });
}

function drawRadar() {

    // Display vehicle coordinates cleanly
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";

    // Draw POIs without redundancy
    drawPOIs();
}


// Main loop (unchanged)
function updateRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRadar();
    requestAnimationFrame(updateRadar);
}

// Start the loop
updateRadar();

  