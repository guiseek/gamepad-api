import {ButtonsHandler} from '../../apis/buttons-handler'
import {AxesHandler} from '../../apis/alex-handler'

// type AxeActive = <T>(...params: T[]) => boolean

export class FrameControl {
  #index = 0
  get index() {
    return this.#index
  }
  #lastUpdate = 0
  get lastUpdate() {
    return this.#lastUpdate
  }

  #animationKey: AnimationKey = 'waiting'
  get animationKey() {
    return this.#animationKey
  }

  #lastAnimationKey: AnimationKey = this.animationKey
  get lastAnimationKey() {
    return this.#lastAnimationKey
  }

  constructor(
    private animationFrame: AnimationFrame<AnimationKey>,
    private buttonsHandler: ButtonsHandler,
    private axesHandler: AxesHandler,
    private fps: number
  ) {}

  select<A extends number, B extends boolean>(
    axes: A[],
    buttons: B[],
    currentTime: number
  ) {
    const elapsedTime = currentTime - this.lastUpdate
    let frames: Canvas[]
    let frame: Canvas

    if (elapsedTime > 1000 / this.fps) {
      this.update(currentTime)

      if (buttons.some(this.buttonsHandler.isActive)) {
        this.#animationKey = this.getAnimationKey(
          this.buttonsHandler.handle(buttons)
        )

        frames = this.animationFrame[this.animationKey]
        frame = frames[this.index]

        if (this.index < frames.length) this.next()
        else if (this.animationKey !== this.lastAnimationKey) this.reset()

        this.#lastAnimationKey = this.animationKey

        return frame
      }
      if (axes.some(this.axesHandler.isActive)) {
        // const {x, y} = this.axesHandler.handle(axes)
      }
    }
  }

  next() {
    this.#index += 1
  }

  reset() {
    this.#index = 0
  }

  update(currentTime: number) {
    this.#lastUpdate = currentTime
  }

  getAnimationKey(buttons: boolean[]): AnimationKey {
    const [tilt, frontFlip, running, backFlip, hartAttack, superMan] = buttons

    if (tilt) return 'tilt'
    if (frontFlip) return 'frontFlip'
    if (running) return 'running'
    if (backFlip) return 'backFlip'
    if (hartAttack) return 'hartAttack'
    if (superMan) return 'superMan'
    else return 'waiting'
  }
}
