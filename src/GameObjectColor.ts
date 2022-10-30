export default class GameObjectColor {
  constructor(
    private r: number,
    private g: number,
    private b: number,
    private a: number
  ) {}
  public toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  public getValues() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  public merge(obj: GameObjectColor) {
    const tempObj = obj.getValues();
    this.r += tempObj.r;
    this.g += tempObj.g;
    this.b += tempObj.b;
    this.a += tempObj.a;
  }

  public clone() {
    return new GameObjectColor(this.r, this.g, this.b, this.a);
  }
}
