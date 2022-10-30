import CircleGameObject from "./CircleGameObject";
import GameObjectColor from "./GameObjectColor";
import Vector2 from "./Vector2";

export default class Enemy extends CircleGameObject {
  constructor(
    pos: Vector2,
    radius: number,
    color: GameObjectColor,
    private velocity: Vector2 | null
  ) {
    super(pos, radius, color);
  }

  public update() {
    this.draw();
    if (!this.velocity) return;
    this.pos = this.pos.add(this.velocity);
  }
}
