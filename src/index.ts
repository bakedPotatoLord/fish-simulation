import Fish from "./Fish"

const c = <HTMLCanvasElement>document.querySelector('canvas') 
const ctx = <CanvasRenderingContext2D>c.getContext('2d')

const cw = c.width = 400
const ch = c.height = 400

export const TAU = 2* Math.PI 

let fish:Fish[];

function background(){
  ctx.fillStyle = 'rgb(150,150,255)'
  ctx.fillRect(0,0,cw,ch)
}

export function rand(high:number,low:number){
  return low +( Math.random()*(high-low))
}


export const config = {
  "gravity": 0.05,
  "friction": 0.2
}

window.onload = ()=>{

  fish = Array(4).fill(undefined).map(
    ()=>new Fish(rand(0,400),rand(0,400))
  )

  draw()
}

function draw(){
  background()
  
  fish.forEach(el => {
    el.applyPhysics()
    el.draw(ctx)

    if(el.y > 300){
      el.pushUp()
    }
  });

  

  requestAnimationFrame(draw)
}