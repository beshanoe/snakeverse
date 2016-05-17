import * as PIXI from 'pixi.js'
import {Scene} from '../scene'

export class Snake extends Scene{
  
  public stage:PIXI.Container;
  
  private body:SnakePart[] = [];
  private graphics:PIXI.Graphics;
  private stopped:boolean = false;
  
  protected animateThrottleTime:number = 100;
  
  private keydownHandler:any;
    
  constructor() {
    super();
    this.stage = new PIXI.Container();
    
    window.addEventListener('keydown', this.keydownHandler);
    PIXI.EventEmitter
    let head = new SnakePart('');
    this.body.push(head);
    this.stage.addChild(head.dio);
  }
  
  public throttledAnimate() {
    let rollback:boolean = false;
    let rollbackList:number[][] = [];
    if (this.stopped) {
      return;
    }
    for (let i = 0, len = this.body.length; i < len; i++){
      let snakePart = this.body[i];
      let [kx, ky] = snakePart.direction;
      let {x, y} = snakePart.dio.position;
      rollbackList.push([x, y]);
      let pos:number[] = [
        x + kx*snakePart.size,
        y + ky*snakePart.size
      ];
      if (
        (i === 0 && !this.isValidHeadPosition(pos[0], pos[1])) ||
        (i !== 0 && 
          this.body[0].dio.position.x === pos[0] &&
          this.body[0].dio.position.y === pos[1])) {
        this.stop();
        rollback = true;
        break;
      }
      snakePart.dio.position.set(pos[0], pos[1]);
      let nextPart = this.body[i+1];
      if (nextPart) {
        nextPart.nextDirection = snakePart.direction;
      }
      if (snakePart.nextDirection) {
        snakePart.direction = snakePart.nextDirection;
      }
    }
    if (rollback) {
      rollbackList.forEach((pos:number[], i) => {
        this.body[i].dio.position.set(pos[0], pos[1]);
      });
      this.emit('gameover');
    }
  }
  
  public appendToTail() {
    let lastSnakePart = this.body[this.body.length - 1];
    let newSnakePart = new SnakePart('');
    let [kx, ky] = lastSnakePart.direction;
    let {x, y} = lastSnakePart.dio.position;
    newSnakePart.dio.position = new PIXI.Point(
      x - kx*newSnakePart.size,
      y - ky*newSnakePart.size
    );
    this.body.push(newSnakePart);
    this.stage.addChild(newSnakePart.dio);
  }
  
  public turn(direction:number[]) {
    let [head, ...tail] = this.body;
    if (head.direction.indexOf(0) + direction.indexOf(0) === 1) {
      head.direction = direction;
    }
  }
  
  public isValidHeadPosition(x:number, y:number):boolean {
    let inBounds = x >= 0 && y >= 0 && x < 800 && y < 600;
    return inBounds;
  }
  
  public stop() {
    this.stopped = true;
  }
  
  public destroy() {
    window.removeEventListener('keydown', this.keydownHandler);
  }
    
}

export class SnakePart {
  
  public direction:number[] = [1, 0];
  public nextDirection:number[];
  public dio:PIXI.DisplayObject;
  public size:number = 40;
  public oldPos:number[] = [0, 0];
    
  constructor(imageUrl: string) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(Math.random()*0xFFFFFF);
    //graphics.lineStyle(1, 0xFF0000);
    graphics.drawRect(0, 0, this.size, this.size);
    graphics.position = new PIXI.Point(120,120);
    
    this.dio = graphics;
  }
    
}