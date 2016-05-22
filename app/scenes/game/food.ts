import * as PIXI from 'pixi.js'
import { Scene } from '../scene'

export class Food extends Scene {
  
  public stage:PIXI.Container;
  protected animateThrottleTime:number = 30;
  
  protected animating:any[] = [];
  
  constructor() {
    super();
    this.stage = new PIXI.Container;
  }
  
  public makeFood(x:number, y:number, size:number) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(Math.random()*0xFFFFFF);
    graphics.drawRect(0, 0, size, size);
    graphics.position = new PIXI.Point(x*size,y*size);
    this.stage.addChild(graphics);
    return [x, y];
  }
  
  public removeFood() {
    this.stage.removeChildAt(0);
  }
  
}