function renderAsteroid(ctx, x, y, size, options, angle = 0) {
    const { craterRange, irregularityRange, holeRange } = options;
  
    // Save canvas state for rotation
    ctx.save();
    ctx.translate(x, y); // Move to the asteroid center
    ctx.rotate(angle); // Apply rotation
    ctx.translate(-x, -y); // Move back
  
    // Generate asteroid shape
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
  
    // Add ore deposits (from asteroidOre.js)
    addOreDeposits(ctx, x, y, size, existingElements, oreTypes);
  
    // Restore canvas state after rotation
    ctx.restore();
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
  
  function addOreDeposits(ctx, x, y, size, existingElements, oreTypes) {
    const depositCount = Math.floor(2 + Math.random() * 3); // Randomize number of deposits
  
    for (let i = 0; i < depositCount; i++) {
      let depositX, depositY, depositSize;
      let attempts = 0;
  
      do {
        depositX = x + (Math.random() - 0.5) * size * 0.8; // Random position within asteroid
        depositY = y + (Math.random() - 0.5) * size * 0.8;
        depositSize = Math.random() * (size * 0.2) + size * 0.05; // Random size
        attempts++;
      } while (checkCollision(depositX, depositY, existingElements, depositSize) && attempts < 50);
  
      if (attempts >= 50) continue; // Skip if placement fails after 50 attempts
  
      // Randomly select an ore type
      const oreType = oreTypes[Math.floor(Math.random() * oreTypes.length)];
  
      // Draw the ore deposit
      ctx.beginPath();
      ctx.arc(depositX, depositY, depositSize, 0, Math.PI * 2);
      ctx.fillStyle = oreType.color;
      ctx.fill();
  
      // Add a gradient effect for depth
      const gradient = ctx.createRadialGradient(
        depositX,
        depositY,
        depositSize * 0.2,
        depositX,
        depositY,
        depositSize
      );
      gradient.addColorStop(0, oreType.color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = gradient;
      ctx.fill();
  
      // Save position for collision checking
      existingElements.push({ x: depositX, y: depositY, radius: depositSize });
    }
  }
  