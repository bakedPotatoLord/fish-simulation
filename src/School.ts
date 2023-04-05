import { rand } from ".";
import Fish from "./Fish";

export default class School{
  fish:Fish[]
  constructor(numFishes:number){
    this.fish = Array(numFishes).fill(undefined).map(
      ()=>new Fish(rand(0,400),rand(0,200),this)
    )
  }
  
  draw(ctx:CanvasRenderingContext2D){
    this.fish.forEach(el =>{ 
      el.draw(ctx)
      el.drawFlippers(ctx)
    })
  }

  update(){
    this.fish.forEach(el => {

      el.topFlipper +=0.08

      if(el.topFlipper > 0.7){
        el.flipperSetpoint = -0.2
      } 

      el.applyPhysics()

      el.avoidOtherFish()
      el.avoidWall()
  
      if(el.y > 300){
        el.pushUp()
      }
    });
  }

  getClosestFish(toLook:Fish){
    return this.fish.reduce(
      (prev,curr)=>
        (
          Math.hypot(curr.x - toLook.x,curr.y - toLook.y) >
          Math.hypot(prev.x - toLook.x,prev.y - toLook.y) ||
          curr == toLook
        )?
        prev:curr
      ,
      new Fish(-Infinity,-Infinity)
    )
  }
}
