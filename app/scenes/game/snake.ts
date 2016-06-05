import * as PIXI from 'pixi.js'
import * as Rainbow from 'rainbowvis.js'
import { Scene } from '../scene'



export class Snake extends Scene{
  
  public stage:PIXI.Container;
  
  private body:SnakePart[] = [];
  private graphics:PIXI.Graphics;
  private stopped:boolean = false;
  private changePending = false;
  private rainbow;
  
  protected animateThrottleTime:number = 100;
  
  private keydownHandler:any;
    
  constructor() {
    super();
    this.stage = new PIXI.Container();
    this.rainbow = new Rainbow();
    this.rainbow.setSpectrum('#E60079', '#0091E6', '#21BA25');
    this.rainbow.setNumberRange(0, 70);
    
    window.addEventListener('keydown', this.keydownHandler);
    
    let head = new SnakePart(this.rainbow.colourAt(0));
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
      let [x, y] = snakePart.position;
      rollbackList.push([x, y]);
      let pos:number[] = [
        x + kx,
        y + ky
      ];
      if (
        (i === 0 && !this.isValidHeadPosition(pos[0], pos[1])) ||
        (i !== 0 && 
          this.body[0].position[0] === pos[0] &&
          this.body[0].position[1] === pos[1])) {
        this.stop();
        rollback = true;
        break;
      }
      snakePart.position = pos;
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
        this.body[i].position = pos;
      });
      this.emit('gameover');
    } else {
      this.emit('headmoved', this.body[0].position)
      this.changePending = false;
    }
  }
  
  public appendToTail() {
    let lastSnakePart = this.body[this.body.length - 1];
    let newSnakePart = new SnakePart(
      this.rainbow.colourAt(this.body.length)
    );
    let [kx, ky] = lastSnakePart.direction;
    let [x, y] = lastSnakePart.position;
    newSnakePart.position = [x - kx, y - ky];
    newSnakePart.direction = lastSnakePart.direction;
    this.body.push(newSnakePart);
    this.stage.addChild(newSnakePart.dio);
  }
  
  public turn(direction:number[]) {
    let [head,] = this.body;
    if (
      (head.direction.indexOf(0) + direction.indexOf(0) === 1) &&
      !this.changePending) {
      head.direction = direction;
      this.changePending = true;
    }
  }
  
  public isValidHeadPosition(x:number, y:number):boolean {
    let inBounds = x >= 0 && y >= 0 && x < 20 && y < 15;
    return inBounds;
  }
  
  public stop() {
    this.stopped = true;
  }
  
  public destroy() {
    window.removeEventListener('keydown', this.keydownHandler);
  }
  
  public restart() {
    this.body.forEach((snakePart:SnakePart) => {
      this.stage.removeChild(snakePart.dio);
    });
    this.body = [];
    let head = new SnakePart(this.rainbow.colourAt(0));
    this.body.push(head);
    this.stage.addChild(head.dio);
    this.stopped = false;
  }
  
  public isInSnake(position:number[]) {
    let joined = position.join('');
    return this.body.some(snakePart => snakePart.position.join('') === joined);
  }
    
}

export class SnakePart {
  
  public direction:number[] = [1, 0];
  public nextDirection:number[];
  public dio:PIXI.DisplayObject;
  public size:number = 40;
  private _position:number[] = [0, 0];
  
  get position() {
    return this._position;
  }
  
  set position(position) {
    this._position = position;
    this.dio.position.set(
      position[0]*this.size, 
      position[1]*this.size
    );
  }
    
  constructor(color: string, x:number = 5, y:number = 5) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(parseInt(color, 16));
    //graphics.lineStyle(1, 0xFF0000);
    graphics.drawRect(0, 0, this.size, this.size);
    this.dio = graphics;
    this.position = [x, y];
  }
    
}