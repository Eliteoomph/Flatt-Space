import { vehicle } from "./vehicle.js";

// Playfield dimensions
export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

export const playfieldWidth = 20000;
export const playfieldHeight = 20000;

// Fullscreen canvas setup
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Sample POIs and colors for the mini-map (import or define them properly)
const POIs = [
  { x: 5000, y: 4000, name: "Friendly Base", type: "friendly" },
  { x: 6000, y: 8000, name: "Enemy Ship", type: "enemy" },
  { x: 7000, y: 9000, name: "Resource Field", type: "default" },
];
const poiColors = { default: "yellow", enemy: "red", friendly: "green" };

function drawGrid() {
  const gridSpacing = 500;
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 1;

  // Vertical gridlines
  for (let x = 0; x <= playfieldWidth; x += gridSpacing) {
    const screenX = canvas.width / 2 + (x - vehicle.x);
    if (screenX >= 0 && screenX <= canvas.width) {
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, canvas.height);
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fillText(`${x}`, screenX + 2, 12);
    }
  }

  // Horizontal gridlines
  for (let y = 0; y <= playfieldHeight; y += gridSpacing) {
    const screenY = canvas.height / 2 + (y - vehicle.y);
    if (screenY >= 0 && screenY <= canvas.height) {
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(canvas.width, screenY);
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fillText(`${y}`, 2, screenY - 2);
    }
  }
}

// Generate a starry background
const stars = Array.from({ length: 1500 }, () => ({
  x: Math.random() * playfieldWidth,
  y: Math.random() * playfieldHeight,
  size: Math.random() * 2 + 0.5,
  color: `rgba(255, 255, ${Math.floor(Math.random() * 156 + 100)}, ${Math.random() * 0.8 + 0.2})`,
  twinkle: Math.random() * 0.05,
}));

function drawStars() {
  stars.forEach((star) => {
    const dx = star.x - vehicle.x;
    const dy = star.y - vehicle.y;
    const screenX = canvas.width / 2 + dx;
    const screenY = canvas.height / 2 + dy;

    if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
      const twinkleAlpha = Math.abs(Math.sin(Date.now() * star.twinkle)) * 0.5 + 0.5;
      ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${twinkleAlpha})`);
      ctx.beginPath();
      ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function drawMiniMap() {
  const miniMapSize = 200;
  const miniMapMargin = 10;
  const scale = miniMapSize / Math.max(playfieldWidth, playfieldHeight);

  // Mini-map background
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(canvas.width - miniMapSize - miniMapMargin, miniMapMargin, miniMapSize, miniMapSize);

  // Draw POIs
  POIs.forEach((poi) => {
    const mapX = (poi.x * scale) + (canvas.width - miniMapSize - miniMapMargin);
    const mapY = (poi.y * scale) + miniMapMargin;
    ctx.fillStyle = poiColors[poi.type] || "white";
    ctx.beginPath();
    ctx.arc(mapX, mapY, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw the vehicle on the mini-map
  const shipX = (vehicle.x * scale) + (canvas.width - miniMapSize - miniMapMargin);
  const shipY = (vehicle.y * scale) + miniMapMargin;
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(shipX, shipY, 5, 0, Math.PI * 2);
  ctx.fill();
}

// Call grid, stars, and minimap draw functions
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawStars();
  drawMiniMap();
}

export { drawGrid, drawStars, drawMiniMap, drawCanvas };
