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
  /**
   * This function updates the properties of each fish in the
   *  "fish" array. It first checks if the fish's "yv" property
   *  is less than -0.8, and if so, it updates the fish's
   *  "topFlipper" property based on the fish's "flipperSpeed"
   *  and "flipperDirection" properties. Then, it checks if the
   *  fish's "topFlipper" property is greater than 0.7, and if
   *  so, it sets the fish's "flipperDirection" property to -1.
   *  If the "topFlipper" property is less than 0.2, it sets the
   *  "flipperDirection" property to 1. Next, there is a 1%
   *  chance that the fish will be pushed to the left with a
   *  random value between -1.5 and 1.5. The function then
   *  applies physics to the fish, causes it to avoid other fish
   *  and walls, and finally, if the fish's "y" property is
   *  greater than 300, it pushes the fish up with a random
   *  value between -1.5 and -0.75.
   */
  update(){
    this.fish.forEach(el => {

      if(el.yv < -0.8) el.topFlipper +=el.flipperSpeed*el.flipperDirection

      if(el.topFlipper > 0.7){
        el.flipperDirection = -1
      } else if(el.topFlipper < 0.2){
        el.flipperDirection = 1
      }

      if(Math.random() < 0.01){
        el.pushLeft(rand(-1.5,1.5))
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
