import * as PIXI from 'pixi.js'
import * as TWEEN from 'tween.js'
import { Scene } from './scenes/scene'
import { MenuScene } from './scenes/menu/menu-scene'
import { GameScene } from './scenes/game/game-scene'

export class Game {
  
  public renderer:PIXI.SystemRenderer;
  public stage:PIXI.Container;
  
  private animating:any[] = [];
  
  constructor(
    private element:HTMLElement, 
    private snakePartSize:number = 40,
    private fieldWidth:number = 20,
    private fieldHeight:number = 15) {
    this.renderer = new PIXI.WebGLRenderer(
      fieldWidth*snakePartSize, 
      fieldHeight*snakePartSize
    );
    element.appendChild(this.renderer.view);
    
    this.stage = new PIXI.Container();
  }
  
  public start() {
    let menuScene = new MenuScene();
    let gameScene = new GameScene();
    menuScene.on('play', () => {
      gameScene.stage.position.x = 800;
      this.addScene(gameScene);
      new TWEEN.Tween(menuScene.stage.position)
        .to({x: -800}, 500)
        .start();
      new TWEEN.Tween(gameScene.stage.position)
        .to({x: 0}, 500)
        .start()
        .onComplete(() => this.removeScene(menuScene));
    });
    this.addScene(menuScene);
    
    this.animate();      
  }
  
  private addScene(scene:Scene) {
    this.stage.addChild(scene.stage);
    this.animating.push(scene);
  }
  
  private removeScene(scene:Scene) {
    this.stage.removeChild(scene.stage);
    this.animating.splice(
      this.animating.indexOf(scene), 1
    );
  }
  
  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    TWEEN.update();
    this.animating.forEach(item => item.animate());
    this.renderer.render(this.stage);
  }
  
  
}