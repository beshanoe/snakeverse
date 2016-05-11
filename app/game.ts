import * as PIXI from 'pixi.js'

export class Game {
  
  public renderer:PIXI.SystemRenderer;
  public stage:PIXI.Container;
  
  constructor(element:HTMLElement) {
    this.renderer = new PIXI.WebGLRenderer(800, 600);
    element.appendChild(this.renderer.view);
    
    this.stage = new PIXI.Container();
  }
  
}