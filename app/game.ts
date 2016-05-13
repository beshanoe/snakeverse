import * as PIXI from 'pixi.js'
import {Snake} from './snake'

export class Game {
  
  public renderer:PIXI.SystemRenderer;
  public stage:PIXI.Container;
  
  private animating:any[] = [];
  
  constructor(element:HTMLElement) {
    this.renderer = new PIXI.WebGLRenderer(800, 600);
    element.appendChild(this.renderer.view);
    
    this.stage = new PIXI.Container();
  }
  
  public start() {
    let snake = new Snake();
    window.addEventListener('keydown', (e:KeyboardEvent) => {
      let direction:number[] = [0, 0];
      switch (e.keyCode) {
        case 38: direction = [0, -1]; break;
        case 40: direction = [0, 1]; break;
        case 37: direction = [-1, 0]; break;
        case 39: direction = [1, 0]; break;
      }
      snake.turn(direction);
    });
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    snake.appendToTail();
    this.stage.addChild(snake.stage);
    this.animating.push(snake);
    this.animate();
      
  }
  
  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.animating.forEach(item => item.animate());
    this.renderer.render(this.stage);
  }
  
  
}