import {ButtonsHandler} from '../../apis/buttons-handler'
import {AxesHandler} from '../../apis/alex-handler'
import {Control} from '../../apis/control'
import {PlayerFrame} from './player-frame'
import {Position} from './position'
import {Config} from '../config'
import {Speed} from './speed'

export class Player {
  constructor(
    private speed: Speed,
    private position: Position,
    private config: Config,
    private control: Control,
    private axes: AxesHandler<number>,
    private buttons: ButtonsHandler<GamepadButton>,
    private frame: PlayerFrame,
    private ctx: CanvasRenderingContext2D
  ) {}

  init() {
    let lastUpdate = 0
    this.control.onGamepad = (currentTime, gp) => {
      const elapsedTime = currentTime - lastUpdate

      if (elapsedTime > 1000 / this.config.FPS) {
        lastUpdate = currentTime

        this.speed.y += this.config.GRAVITY

        if (gp) {
          const axes = this.axes.handle(gp.axes)
          this.position.x += axes.x * this.config.VELOCITY
          this.position.y += axes.y * -1 * this.config.VELOCITY

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
    this.ctx.drawImage(image, x, y, this.config.SIZE / 2, this.config.SIZE / 2)
  }
}
