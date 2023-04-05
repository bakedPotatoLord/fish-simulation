import { config, TAU } from "."

export default class Fish{
  x:number
  y:number
  xv = 0
  yv = 0
  xa = 0
  ya = 0
  constructor(x:number,y:number) {
    this.x = x
    this.y = y
  }
  
  draw(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.ellipse(this.x,this.y,10,50,0,0,TAU)
    ctx.fill()
  }

  applyPhysics(){
    this.applyGravity()
    this.applyFriction()
    this.xv += this.xa
    this.yv += this.ya
    this.x += this.xv
    this.y += this.yv
  }

  applyGravity(){
    this.ya += config.gravity;
  }

  applyFriction(){
    this.xa *= config.friction
    this.ya *= config.friction
  }

  pushUp(){
    this.ya -= 0.2
  }
}