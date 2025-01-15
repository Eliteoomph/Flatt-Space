const canvas = document.getElementById("asteroidCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let craterRange = 0.8;
let irregularityRange = 0.8;
let holeRange = 0.6;

// Draw space background
function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Render the entire scene
function drawScene() {
  drawBackground();
  renderAsteroid(ctx, canvas.width / 2, canvas.height / 2, 150, {
    craterRange,
    irregularityRange,
    holeRange,
  });
}

// Handle updates from UI controls
document.getElementById("updateAsteroid").addEventListener("click", () => {
  craterRange = parseFloat(document.getElementById("craterRange").value);
  irregularityRange = parseFloat(
    document.getElementById("irregularityRange").value
  );
  holeRange = parseFloat(document.getElementById("holeRange").value);

  drawScene();
});

// Initial draw
drawScene();
