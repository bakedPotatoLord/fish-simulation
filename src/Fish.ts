import { config, cw, TAU } from "."
import School from "./School"

export default class Fish{
  x:number
  y:number
  xv = 0
  yv = 0
  xa = 0
  ya = 0
  parent:School
  constructor(x:number,y:number,parent:School) {
    this.x = x
    this.y = y
    this.parent = parent
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
    this.ya = 0
    this.yv  = -1
  }

  distanceTo(to:Fish){
    return Math.hypot(this.x - to.x,this.y - to.y)
  }

  avoidWall(){
    if(this.x <= 50){
      this.xa += 0.1
    }else if(this.x > 350){
      this.xa -= 0.1
    }
  }

  collideWithWall(){
    if(this.x <= 10 || this.x >= cw-10){
      this.xa = 0
      this.xv = 0
    }
  }

  avoidOtherFish(){
    console.log(this.parent.getClosestFish(this).distanceTo(this))
    if(this.parent.getClosestFish(this).distanceTo(this) < 200){
      console.log("fish")
      if(this.x < this.parent.getClosestFish(this).x){
        this.pushRight()
      }else{
        this.pushLeft()
      }
    }
    
  }

  pushLeft(){
    this.xa += 0.01
  }

  pushRight(){
    this.xa -= 0.01
  }
}