

const c = <HTMLCanvasElement>document.querySelector('canvas') 
const ctx = <CanvasRenderingContext2D>c.getContext('2d')

const cw = c.width = 400
const ch = c.height = 400

const TAU = 2* Math.PI 


function background(){
  ctx.fillStyle = 'rgb(150,150,255)'
  ctx.fillRect(0,0,cw,ch)
}

export function rand(high:number,low:number){
  return low +( Math.random()*(high-low))
}

class Fish{
  x:number
  y:number
  xv = 0
  yv = 0
  constructor(x:number,y:number) {
    this.x = x
    this.y = y
  }
  
  draw(){
    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.ellipse(this.x,this.y,10,50,0,0,TAU)
    ctx.fill()
  }

  applyPhysics(){
    this.x += this.xv
    this.y += this.yv
  }

  applyGravity(){
    this.yv *= 1.01
  }
}
let fish = Array(4).fill(undefined).map(
  ()=>new Fish(rand(0,400),rand(0,400))
)

window.onload = ()=>{

  draw()
}

function draw(){
  background()
  
  fish.forEach(el => {
    el.draw()
  });

  requestAnimationFrame(draw)
}