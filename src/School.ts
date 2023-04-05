import { rand } from ".";
import Fish from "./Fish";

export default class School{
  private fish:Fish[]
  constructor(numFishes:number){
    this.fish = Array(numFishes).fill(undefined).map(
      ()=>new Fish(rand(0,400),rand(0,200))
    )
  }
  
  draw(ctx:CanvasRenderingContext2D){
    this.fish.forEach(el => el.draw(ctx))
  }

  update(){
    this.fish.forEach(el => {
      el.applyPhysics()
  
      if(el.y > 300){
        el.pushUp()
      }
    });
  }
}