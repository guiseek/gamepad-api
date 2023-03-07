import {GamepadButtonsHandler} from '../../apis/gamepad/buttons-handler'
import {GamepadAxesHandler} from '../../apis/gamepad/axes-handler'
import {GamepadControl} from '../../game-control'
import {PlayerFrame} from './player-frame'
import {Store} from '../state/store'
import {freeze} from '../utilities'
import {config} from '../config'

// const GRAVITY = 0.2
// const VELOCITY = 10
// const FPS = 30

class Position {
  constructor(public x = 0, public y = 0, public r = 0) {}
}
class Speed {
  constructor(public y = 0, public r = 0) {}
}

interface PlayerState {
  size: number
}

const initialState = freeze<PlayerState>({
  size: config.size,
})

export class Player extends Store<PlayerState> {
  frame: PlayerFrame
  speed = new Speed()
  position = new Position()
  control = new GamepadControl()
  axes = new GamepadAxesHandler()
  buttons = new GamepadButtonsHandler()

  constructor(
    private ctx: CanvasRenderingContext2D,
    animation: AnimationFrame<AnimationKey>
  ) {
    super(initialState)
    this.frame = new PlayerFrame(animation)
  }

  init() {
    let lastUpdate = 0
    this.control.onGamepad = (currentTime, gp) => {
      const elapsedTime = currentTime - lastUpdate

      if (elapsedTime > 1000 / config.fps) {
        lastUpdate = currentTime

        this.speed.y += config.gravity

        if (gp) {
          const axes = this.axes.handle(gp.axes)
          this.position.x += axes.x * config.velocity
          this.position.y += axes.y * -1 * config.velocity

          this.frame.select(this.buttons.handle(gp.buttons))
        }


        if (this.frame.currentFrame) {
          this.draw(this.frame.currentFrame)
        }
      }
    }

    this.control.run()
  }

  draw(image: Canvas) {
    this.ctx.save()
    // this.ctx.translate(this.position.x, this.position.y)
    const {width, height} = this.ctx.canvas
    const {x, y} = this.position
    this.ctx.rotate(this.position.r)
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.drawImage(image, x, y, this.state.size / 2, this.state.size / 2)
  }
}
