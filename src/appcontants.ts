import GameObjectColor from "./GameObjectColor";

const appCanvas = document.createElement("canvas");

const appContext = appCanvas.getContext("2d") as CanvasRenderingContext2D;
if (appContext === null) throw new Error("No Context");

const appTargetedFPS = 60;
const appFrameTime = 1000 / 60;
const appSqrtTwo = Math.sqrt(2);
const appColors = {
  white: new GameObjectColor(255, 255, 255, 1),
};

export {
  appCanvas,
  appContext,
  appTargetedFPS,
  appFrameTime,
  appSqrtTwo,
  appColors,
};
