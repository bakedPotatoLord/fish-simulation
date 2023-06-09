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

  /**
   * Draws the flippers on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The context on which to draw the flippers.
   */

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

    const isMovingLeft = this.xv < 0
    const ismovingSlow = Math.abs(this.xv) < 0.1
    
    ctx.beginPath()
    ctx.moveTo(this.x+ (isMovingLeft ? 8:-8),this.y)
    ctx.ellipse(
      this.x+(isMovingLeft ? 8:-8),
      this.y,
      5,
      ismovingSlow ? 0: 20,
      0,
      (isMovingLeft ? 0:Math.PI),
      Math.PI/2,
      !isMovingLeft 
      )
    ctx.fill()
    ctx.restore()
  }

  /**
  * Applies physics to the object's position and velocity
  */
  applyPhysics() {
    // Apply gravity to the y velocity
    this.applyGravity();
    // Apply friction to the x and y velocities
    this.applyFriction();
    // Update the x and y velocities based on the acceleration
    this.xv += this.xa;
    this.yv += this.ya;
    // Update the x and y position based on the velocity
    this.x += this.xv;
    this.y += this.yv;
    // Collide with any walls in the scene
    this.collideWithWall();
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

  pushUp(val?:number ){
    this.ya = 0
    this.yv  = val ?? -1
  }

  /**
  * Calculates the distance between this fish and another fish.
  * @param {Fish} to - The fish to calculate the distance to.
  * @returns {number} The distance between the two fish.
  */

  distanceTo(to:Fish): number{
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
  /**
 * Moves the current fish away from other fish within 100 pixels.
 * If no other fish are nearby, stops horizontal movement.
 */

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