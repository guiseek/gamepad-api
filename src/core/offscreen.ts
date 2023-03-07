export class Offscreen {
  canvas: Canvas
  context: CanvasRendering

  constructor(public width: number, public height: number) {
    const {canvas, context} = this.load(width, height)
    this.canvas = canvas
    this.context = context
  }

  private load(width: number, height = width) {
    if ("OffscreenCanvas" in window) {
      const canvas = new OffscreenCanvas(width, height)
      const context = canvas.getContext("2d") as CanvasRendering
      return {canvas, context}
    } else {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext("2d") as CanvasRendering
      return {canvas, context}
    }
  }
}
