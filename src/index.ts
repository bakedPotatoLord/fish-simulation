import School from "./School"

const c = <HTMLCanvasElement>document.querySelector('canvas') 
const ctx = <CanvasRenderingContext2D>c.getContext('2d')

export const cw = c.width = 400
export const ch = c.height = 400

export const TAU = 2* Math.PI 

let school:School

function background(){
  ctx.fillStyle = 'rgb(150,150,255)'
  ctx.fillRect(0,0,cw,ch)
}

export function rand(high:number,low:number){
  return low +( Math.random()*(high-low))
}


export const config = {
  "gravity": 0.05,
  "friction": 0.1
}

window.onload = ()=>{
  school = new School(4)

  draw()
}

function draw(){
  background()
  
  school.draw(ctx)
  school.update()

  requestAnimationFrame(draw)
}