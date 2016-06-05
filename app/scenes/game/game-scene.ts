import * as PIXI from 'pixi.js'
import { Scene } from '../scene'
import { Background } from './background'
import { Snake } from './snake'
import { Food } from './food'
import { Hud } from './hud'

export class GameScene extends Scene {
  
  public stage:PIXI.Container;
  protected animateThrottleTime:number = 30;
  
  private animating:any[] = [];
  
  constructor() {
    super();
    this.stage = new PIXI.Container;
    
    let bkg = new Background();
    let snake = new Snake();
    let food = new Food();
    let hud = new Hud();
    let lastFood = food.makeFood(
      Math.floor(Math.random()*20),
      Math.floor(Math.random()*15),
      40
    );
    
    hud.on('playagain', () => {
      hud.count = 0;
      snake.restart();
      bkg.restart();
    });
    snake.on('gameover', () => {
      //this.animating.splice(this.animating.indexOf(bkg), 1);
      hud.gameover();
    });
    snake.on('headmoved', (position:number[]) => {
      if (position[0] === lastFood[0] && position[1] === lastFood[1]) {
        snake.appendToTail();
        snake.appendToTail();
        food.removeFood();
        let foodPosition:number[];
        do {
          foodPosition = [
            Math.floor(Math.random()*20),
            Math.floor(Math.random()*15)
          ];
        } while (snake.isInSnake(foodPosition)); 
        lastFood = food.makeFood(
          foodPosition[0],
          foodPosition[1],
          40
        );
        hud.count += 1;
      }
    });
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
    window.addEventListener('keydown', keydownHandler);
    [bkg, food, snake, hud].forEach((scene:Scene) => {
      this.stage.addChild(scene.stage);
      this.animating.push(scene);
    });
  }
  
  animate() {
    this.animating.forEach(item => item.animate());
  }
  
}