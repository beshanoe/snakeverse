import * as EventEmitter from 'eventemitter3'

export abstract class Scene extends EventEmitter{
  
  public stage:PIXI.Container;
  
  protected lastAnimateTime:number = 0;
  protected animateThrottleTime:number = 1000;
  public animate() {
    let now = Date.now();
    if (now - this.lastAnimateTime > this.animateThrottleTime) {
      this.throttledAnimate();
      this.lastAnimateTime = now;
    }
  }
  public throttledAnimate() {};
  public destroy() {};
  
}