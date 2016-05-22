
import * as PIXI from 'pixi.js'
import * as TWEEN from 'tween.js'
import { Scene } from '../scene'
import { Background } from '../game/background'

export class MenuScene extends Scene {
  
  public stage:PIXI.Container;
  protected animateThrottleTime:number = 30;
  
  private animating:any[] = [];
  
  constructor() {
    super();
    this.stage = new PIXI.Container;
    
    let bgc = new Background(false);
    bgc.direction = [0, -1];
    bgc.animateThrottleTime = 1;
    this.stage.addChild(bgc.stage);
    this.animating.push(bgc);
    
    let style = {
        font : 'bold italic 64px Arial',
        fill : '#00FF00',
        stroke : '#FFFF00',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6
    };

    let playText = new PIXI.Text('Play',style);
    playText.x = (800-playText.width)/2;
    playText.y = -playText.height;
    playText.interactive = true;
    let tween = new TWEEN.Tween(playText.position)
      .to({y: 400}, 1000)
      .easing(TWEEN.Easing.Elastic.Out)
      .delay(500)
      .start();
    playText.on('mouseover', () => {
      playText.style.fill = '#FF0000';
      playText.dirty = true;
    });
    playText.on('mouseout', () => {
      playText.style.fill = '#00FF00';
      playText.dirty = true;
    });
    playText.on('click', () => {
      new TWEEN.Tween(playText.position)
      .to({y: -playText.height}, 500)
      .easing(TWEEN.Easing.Exponential.Out)
      .start()
      .onComplete(() => this.emit('play'));      
    });

    this.stage.addChild(playText);
  }
  
  animate() {
    this.animating.forEach(item => item.animate());
  }
  
}