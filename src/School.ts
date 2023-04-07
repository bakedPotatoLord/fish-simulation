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

      if(el.yv < -0.8) el.topFlipper +=el.flipperSpeed*el.flipperDirection

      if(el.topFlipper > 0.7){
        el.flipperDirection = -1
      } else if(el.topFlipper < 0.2){
        el.flipperDirection = 1
      }

      if(Math.random() < 0.01){
        el.pushLeft(rand(-3.5,3.5))
      }

      el.applyPhysics()

      el.avoidOtherFish()
      el.avoidWall()
  
      if(el.y > 300){
        el.pushUp(-rand(1.5,0.75))
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
