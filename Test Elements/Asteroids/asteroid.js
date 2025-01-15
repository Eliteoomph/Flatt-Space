function renderAsteroid(ctx, x, y, size, options) {
    const { craterRange, irregularityRange, holeRange } = options;
    const path = generateAsteroidShape(ctx, x, y, size);
  
    // Draw base shape
    ctx.fillStyle = "#6E8195";
    ctx.strokeStyle = "#4E5F71";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  
    // Collision list to track existing elements
    const existingElements = [];
  
    // Add asteroid details
    addOvalCratersInside(ctx, x, y, size, craterRange, existingElements);
    addSurfaceIrregularitiesInside(ctx, x, y, size, irregularityRange, existingElements);
    addStyledHoles(ctx, x, y, size, holeRange, existingElements);
  }
  
  function generateAsteroidShape(ctx, x, y, size) {
    const points = 12 + Math.floor(Math.random() * 4); // Randomized irregular edges
    const path = [];
  
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI * 2 / points) * i;
      const distance = size * (0.7 + Math.random() * 0.3);
      const px = x + Math.cos(angle) * distance;
      const py = y + Math.sin(angle) * distance;
      path.push({ x: px, y: py });
    }
  
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.closePath();
    return path;
  }
  