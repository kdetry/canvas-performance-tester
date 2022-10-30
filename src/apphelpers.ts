import { appCanvas, appContext } from "./appcontants";

import Vector2 from "./Vector2";
import gsap from "gsap";

export const drawCircle = (
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  appContext.beginPath();
  appContext.arc(x, y, radius, 0, Math.PI * 2, false);
  appContext.fillStyle = color;
  appContext.fill();
};

export const drawTabela = (score: number) => {
  appContext.beginPath();
//  appContext.fillStyle = "white";
//  appContext.fillRect(10, 10, 150, 55);
  appContext.fillStyle = "#9b5aaa";
  appContext.font = "bold 24px Arial";
  appContext.fillText(`Score: ${score}`, 10, 45);
};

export const randomSpawnPointer = (enemyRadius: number): Vector2 => {
  const randomBoolean = () => Math.random() < 0.5;
  if (randomBoolean()) {
    return new Vector2(
      randomBoolean() ? 0 - enemyRadius : appCanvas.width + enemyRadius,
      Math.random() * appCanvas.height
    );
  }
  return new Vector2(
    Math.random() * appCanvas.width,
    randomBoolean() ? 0 - enemyRadius : appCanvas.height + enemyRadius
  );
};

export const signedRandom = () => Math.random() - 0.5;
