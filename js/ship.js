// ship.js
import { playfieldWidth, playfieldHeight } from "./playfield.js";

export const vehicle = {
  x: playfieldWidth / 2,
  y: playfieldHeight / 2,
  angle: 0,
  speed: 0,
  maxSpeed: 2,
  acceleration: 0.1,
  deceleration: 0.05,
  rotationSpeed: 0.03,
  autoDrive: false,
};
