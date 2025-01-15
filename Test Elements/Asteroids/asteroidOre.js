export function addOreDeposits(x, y, size, existingElements, oreTypes) {
    const oreCount = Math.floor(Math.random() * 3) + 2; // Random number of ores
  
    for (let i = 0; i < oreCount; i++) {
      let oreX, oreY, oreRadius;
      let attempts = 0;
  
      do {
        oreX = x + (Math.random() - 0.5) * size * 0.8;
        oreY = y + (Math.random() - 0.5) * size * 0.8;
        oreRadius = Math.random() * size * 0.05 + size * 0.02;
        attempts++;
      } while (checkCollision(oreX, oreY, existingElements, oreRadius) && attempts < 50);
  
      if (attempts >= 50) continue;
  
      // Randomly select ore type
      const oreType = oreTypes[Math.floor(Math.random() * oreTypes.length)];
  
      // Draw ore
      ctx.beginPath();
      ctx.arc(oreX, oreY, oreRadius, 0, Math.PI * 2);
      ctx.fillStyle = oreType.color;
      ctx.fill();
      existingElements.push({ x: oreX, y: oreY, radius: oreRadius, type: oreType.name });
    }
  }
  
  // Example ore types
  export const oreTypes = [
    { name: "Iron", color: "#a1a1a1" },
    { name: "Gold", color: "#ffd700" },
    { name: "Copper", color: "#b87333" },
  ];
  