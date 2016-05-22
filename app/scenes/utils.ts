import * as PIXI from 'pixi.js'

export class Utils {
  
  static makeButton(text:string):PIXI.Text {
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

    let button = new PIXI.Text(text,style);
    button.interactive = true;
    button.on('mouseover', () => {
      button.style.fill = '#FF0000';
      button.dirty = true;
    });
    button.on('mouseout', () => {
      button.style.fill = '#00FF00';
      button.dirty = true;
    });
    return button;
  }
  
  static makeText(text:string):PIXI.Text {
    let style = {
        font : 'bold italic 64px Arial',
        fill : '#FFFFFF',
        stroke : '#FFFF00',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6
    };
    let pixiText = new PIXI.Text(text,style);
    return pixiText;
  }
  
}