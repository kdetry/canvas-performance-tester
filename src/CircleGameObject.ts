import GameObjectColor from "./GameObjectColor";
import Vector2 from "./Vector2";
import { drawCircle } from "./apphelpers";

export default class CircleGameObject {
  constructor(
    public pos: Vector2,
    public radius: number,
    public color: GameObjectColor
  ) {}

  public draw() {
    drawCircle(this.pos.x, this.pos.y, this.radius, this.color.toString());
  }
}
