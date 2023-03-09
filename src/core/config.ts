const canvas = document.createElement('canvas')!
const ctx = canvas.getContext('2d')!
const size = 512
const gravity = 0.2
const velocity = 10
const fps = 30

canvas.width = innerWidth
canvas.height = innerHeight

onresize = () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
}

onload = () => {
  document.body.appendChild(canvas)
}

export const config = {
  ctx,
  fps,
  size,
  gravity,
  velocity,
}

export class Config {
  #FPS = 30
  get FPS() {
    return this.#FPS
  }
  #SIZE = 512
  get SIZE() {
    return this.#SIZE
  }
  #GRAVITY = 0.2
  get GRAVITY() {
    return this.#GRAVITY
  }
  #VELOCITY = 10
  get VELOCITY() {
    return this.#VELOCITY
  }

  #canvas = document.createElement('canvas')
  get canvas() {
    return this.#canvas
  }

  #canvasContext = this.canvas.getContext('2d')
  get canvasContext() {
    if (!this.#canvasContext) {
      return this.canvas.getContext('2d')
    }
    this.#canvasContext = this.canvas.getContext('2d')
    return this.#canvasContext
  }
}
