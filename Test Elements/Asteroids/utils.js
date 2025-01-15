function checkCollision(x, y, existingElements, radius) {
    for (const element of existingElements) {
      const dist = Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2);
      if (dist < radius + element.radius) return true;
    }
    return false;
  }
  
  function addOvalCratersInside(ctx, x, y, size, range, existingElements) {
    const craterCount = 5;
  
    for (let i = 0; i < craterCount; i++) {
      let craterX, craterY, width, height, angle;
      let attempts = 0;
  
      do {
        craterX = x + (Math.random() - 0.5) * size * range;
        craterY = y + (Math.random() - 0.5) * size * range;
        width = Math.random() * (size * 0.2) + size * 0.1;
        height = width * (0.6 + Math.random() * 0.2);
        angle = Math.random() * Math.PI;
        attempts++;
      } while (checkCollision(craterX, craterY, existingElements, width) && attempts < 50);
  
      if (attempts >= 50) continue;
  
      ctx.beginPath();
      ctx.ellipse(craterX, craterY, width, height, angle, 0, Math.PI * 2);
      ctx.fillStyle = "#4A5A6B";
      ctx.fill();
  
      ctx.beginPath();
      ctx.ellipse(craterX, craterY, width * 0.7, height * 0.7, angle, 0, Math.PI * 2);
      ctx.fillStyle = "#62788A";
      ctx.fill();
  
      existingElements.push({ x: craterX, y: craterY, radius: width });
    }
  }
  
  function addSurfaceIrregularitiesInside(ctx, x, y, size, range, existingElements) {
    const irregularityCount = 10;
  
    for (let i = 0; i < irregularityCount; i++) {
      let detailX, detailY, detailRadius;
      let attempts = 0;
  
      do {
        detailX = x + (Math.random() - 0.5) * size * range;
        detailY = y + (Math.random() - 0.5) * size * range;
        detailRadius = Math.random() * size * 0.03;
        attempts++;
      } while (checkCollision(detailX, detailY, existingElements, detailRadius) && attempts < 50);
  
      if (attempts >= 50) continue;
  
      ctx.beginPath();
      ctx.ellipse(detailX, detailY, detailRadius, detailRadius * 0.8, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fillStyle = "#5C6F80";
      ctx.fill();
  
      existingElements.push({ x: detailX, y: detailY, radius: detailRadius });
    }
  }
  
  function addStyledHoles(ctx, x, y, size, range, existingElements) {
    const holeCount = 4;
  
    for (let i = 0; i < holeCount; i++) {
      let holeX, holeY, holeRadius;
      let attempts = 0;
  
      do {
        holeX = x + (Math.random() - 0.5) * size * range;
        holeY = y + (Math.random() - 0.5) * size * range;
        holeRadius = Math.random() * (size * 0.15) + size * 0.1;
        attempts++;
      } while (checkCollision(holeX, holeY, existingElements, holeRadius) && attempts < 200);
  
      if (attempts >= 200) continue;
  
      ctx.beginPath();
      ctx.arc(holeX, holeY, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#4A5A6B";
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(holeX, holeY, holeRadius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = "#6E8195";
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(holeX, holeY, holeRadius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "#3A4A5B";
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(holeX, holeY, holeRadius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
  
      existingElements.push({ x: holeX, y: holeY, radius: holeRadius });
    }
  }
  