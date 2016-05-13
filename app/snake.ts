import * as PIXI from 'pixi.js'

export class Snake {
  
  public stage:PIXI.Container;
  
  private body:SnakePart[] = [];
  private graphics:PIXI.Graphics;
  
  private lastAnimateTime:number = 0;
  private animateThrottleTime:number = 50;
    
  constructor() {
    this.stage = new PIXI.Container();
    let head = new SnakePart('');
    this.body.push(head);
    
    this.stage.addChild(head.dio);
  }
  
  public animate() {
    let now = Date.now();
    if (now - this.lastAnimateTime > this.animateThrottleTime) {
      this.throttledAnimate();
      this.lastAnimateTime = now;
    }
  }
  
  private throttledAnimate() {
    let f = false;
    this.body.forEach((snakePart:SnakePart, i) => {
      let [kx, ky] = snakePart.direction;
      let {x, y} = snakePart.dio.position;
      snakePart.dio.position = new PIXI.Point(
        x + kx*snakePart.size,
        y + ky*snakePart.size
      );
      let nextPart = this.body[i+1];
      if (nextPart) {
        nextPart.nextDirection = snakePart.direction;
      }
      if (snakePart.nextDirection) {
        snakePart.direction = snakePart.nextDirection;
      }
    });
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
    
}

export class SnakePart {
  
  public direction:number[] = [0, -1];
  public nextDirection:number[];
  public dio:PIXI.DisplayObject;
  public size:number = 30;
    
  constructor(imageUrl: string) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(Math.random()*0xFFFFFF);
    graphics.lineStyle(1, 0xFF0000);
    graphics.drawRect(0, 0, this.size, this.size);
    graphics.position = new PIXI.Point(300,300);
    this.dio = graphics;
  }
    
}