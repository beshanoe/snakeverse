import * as PIXI from 'pixi.js'
import * as TWEEN from 'tween.js'
import { Scene } from '../scene'
import { Utils } from '../utils'

export class Hud extends Scene {
  
  public stage:PIXI.Container;
  
  private animating:any[] = [];
  
  private playAgainBtn:PIXI.Text;
  private countText:PIXI.Text;
  private _count:number = 0;
  
  constructor() {
    super();
    this.stage = new PIXI.Container;
    
    
    let playAgainBtn = Utils.makeButton('Play again');
    playAgainBtn.x = (800-playAgainBtn.width)/2;
    playAgainBtn.y = -playAgainBtn.height;
    playAgainBtn.on('click', () => {
      this.emit('playagain');
      new TWEEN.Tween(this.playAgainBtn.position)
      .to({y: -playAgainBtn.height}, 500)
      .easing(TWEEN.Easing.Quintic.Out)
      .start();
    });
    this.stage.addChild(playAgainBtn);
    this.playAgainBtn = playAgainBtn;
    
    let countText = Utils.makeText('000');
    countText.position.set(
      800-countText.width-10,
      0
    );
    this.stage.addChild(countText);
    this.countText = countText;
  }
  
  gameover() {
    new TWEEN.Tween(this.playAgainBtn.position)
      .to({y: (600-this.playAgainBtn.height)/2}, 1000)
      .easing(TWEEN.Easing.Elastic.Out)
      .start();
  }
  
  set count(number:number) {
    this._count = number;
    this.countText.text = number.toString();
  }
  
  get count():number {
    return this._count;
  }
  
}