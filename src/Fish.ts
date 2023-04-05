import { config, cw, TAU } from "."
import School from "./School"

export default class Fish{
  x:number
  y:number
  xv = 0
  yv = 0
  xa = 0
  ya = 0
  parent:School | undefined
  topFlipper =0
  flipperDirection:1|-1 = 1
  flipperSpeed = 0.05
  constructor(x:number,y:number,parent?:School) {
    this.x = x
    this.y = y
    this.parent = parent
  }
  
  draw(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = '#a6a8a0'
    ctx.beginPath()
    ctx.ellipse(this.x,this.y,8,80,0,0,TAU)
    ctx.fill()
    ctx.fillStyle = '#353634'
    ctx.beginPath()
    ctx.ellipse(this.x,this.y,2,80,0,0,TAU)
    ctx.fill()

    ctx.fillStyle = '#353634'
    ctx.beginPath()
    ctx.moveTo(this.x,this.y+90)
    ctx.lineTo(this.x+5,this.y+60)
    ctx.lineTo(this.x-5,this.y+60)
    ctx.fill()

    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(this.x,this.y+70,2,0,TAU)
    ctx.fill()

    

  }

  drawFlippers(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = '#a6a8a0'
    ctx.save()
    ctx.translate(this.x,this.y-65)
    ctx.rotate(this.topFlipper)
    ctx.beginPath()
    ctx.ellipse(20,0,15,10,0,Math.PI/2,-Math.PI/2)
    ctx.fill()
    
    ctx.rotate(-this.topFlipper)

    ctx.scale(-1,1)
    ctx.rotate(this.topFlipper)
    ctx.beginPath()
    ctx.ellipse(20,0,15,10,0,Math.PI/2,-Math.PI/2)
    ctx.fill()

    ctx.restore()
  }

  applyPhysics(){
    this.applyGravity()
    this.applyFriction()
    this.xv += this.xa
    this.yv += this.ya
    this.x += this.xv
    this.y += this.yv

    this.collideWithWall()
  }

  applyGravity(){
    this.ya += config.gravity;
  }

  stopSelfX(){
    this.xv *= 0.99
    this.xa *= 0.9
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
    if(this.parent == undefined) return;
    const dist = this.parent.getClosestFish(this).distanceTo(this)
    if(dist < 100){
      if(this.x < this.parent.getClosestFish(this).x){
        this.pushRight(1/dist * 1)
      }
      if(this.x > this.parent.getClosestFish(this).x){
        this.pushLeft(1/dist * 1)
      }
    }else{
      this.stopSelfX()
    }
    
  }

  pushLeft(amt:number){
    this.xa += amt
  }

  pushRight(amt:number){
    this.xa -= amt
  }
}