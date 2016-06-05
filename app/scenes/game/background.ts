import * as PIXI from 'pixi.js'
import * as TWEEN from 'tween.js'
import { Scene } from '../scene'

export class Background extends Scene {
  
  public stage:PIXI.Container;
  public animateThrottleTime:number = 30;
  public direction:number[] = [-1, 0];
  
  private animating:any[] = [];
  
  private tilingSprite:PIXI.extras.TilingSprite;
  
  constructor(showGalaxy:boolean = true) {
    super();
    this.stage = new PIXI.Container;
    
    if (showGalaxy) {
      let texture = PIXI.Texture.fromImage('resources/galaxy.png');
      let tilingSprite = new PIXI.extras.TilingSprite(
        texture, 
        800, 
        600
      );
      tilingSprite.alpha = 0.7;
      tilingSprite.tilePosition.set(-600,-300);
      tilingSprite.tileScale.set(1.5, 1.5);
      this.stage.addChild(tilingSprite);
      this.animating.push(tilingSprite);
      this.tilingSprite = tilingSprite;
    }    
    for (let i = 0; i < 5; i++) {
      let letter = '9abcd'[i];
      let color = '#000000'
        .split('')
        .map(l => l==='#'?l:letter)
        .join('');
      let cosmosSprite = new PIXI.extras.TilingSprite(
        this.generateCosmosTexture(
          50-i*10, 
          i, 
          color, 
          2+5*i*i
        ),
        800,
        600
      );
      this.stage.addChild(cosmosSprite);
      this.animating.push(cosmosSprite);
    }
  }
  
  public restart() {
    this.animating.shift();
    new TWEEN.Tween(this.tilingSprite.tilePosition)
      .to({x: -600, y: -300}, 500)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start()
      .onComplete(() => this.animating.unshift(this.tilingSprite));
  }
  
  throttledAnimate() {
    this.animating.forEach((sprite:PIXI.extras.TilingSprite, i) => {
      let [kx, ky] = this.direction;
      let {x, y} = sprite.tilePosition;
      sprite.tilePosition = new PIXI.Point(
        x + kx*(1+1*i*i),
        y + ky*(1+1*i*i)
      );
    })
  }
  
  public turn(direction:number[]) {
    this.direction = direction;
  }
  
  generateCosmosTexture(
    count:number = 500, 
    maxSize:number = 2,
    color:string = '#AAAAAA',
    gap:number = 5
  ):PIXI.Texture {
    let canvas:HTMLCanvasElement = document.createElement('canvas');
    let context:CanvasRenderingContext2D = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    context.fillStyle = color;
    for (let i = 0; i < count; i++) {
      let size = 1 + Math.floor(Math.random()*maxSize);
      context.beginPath();
      context.arc(Math.random()*canvas.width, Math.random()*canvas.height, size, 0, 2 * Math.PI, false);
      context.fill();
    }
    return PIXI.Texture.fromCanvas(canvas, 1);
  }

}