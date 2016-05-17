import * as PIXI from 'pixi.js'
import {Background} from './scenes/game/background'
import {Snake} from './scenes/game/snake'

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
    let bkg = new Background();
    let snake = new Snake();
    for (let i=0;i<10;i++){
      snake.appendToTail();
    }
    
    let keydownHandler = (e:KeyboardEvent) => {
      let direction:number[];
      switch (e.keyCode) {
        case 38: direction = [0, -1]; break;
        case 40: direction = [0, 1]; break;
        case 37: direction = [-1, 0]; break;
        case 39: direction = [1, 0]; break;
      }
      if (direction) {
        snake.turn(direction);
        bkg.turn(direction.map(d => d*-1));
      }
    };
    snake.on('gameover', () => {
      this.animating.splice(this.animating.indexOf(bkg), 1);
    })
    window.addEventListener('keydown', keydownHandler);
    this.stage.addChild(bkg.stage);
    this.stage.addChild(snake.stage);
    this.animating.push(bkg);
    this.animating.push(snake);
    this.animate();      
  }
  
  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.animating.forEach(item => item.animate());
    this.renderer.render(this.stage);
  }
  
  
}