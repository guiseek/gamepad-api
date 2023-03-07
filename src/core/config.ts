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
