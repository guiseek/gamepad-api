import {ButtonsHandler} from './apis/buttons-handler'
import {AxesHandler} from './apis/alex-handler'
import {Control} from './apis/control'
import {Position} from './core/player/position'
import {Speed} from './core/player/speed'
import {Token, provider} from './core/di'
import {Config, config} from './core/config'
import {
  GamepadButtonsHandler,
  GamepadAxesHandler,
  GamepadControl,
} from './apis/gamepad'
import {PlayerFrame} from './core/player/player-frame'
import {loadFrames} from './core/load-frames'
import {FRAMES, Player} from './core/player'

export const CanvasContext = new Token('canvas.context')
export const PlayerAnimation = new Token('player.animation')
export const PlayerDeps = [
  Speed,
  Position,
  Config,
  Control,
  AxesHandler,
  ButtonsHandler,
  PlayerFrame,
  CanvasContext,
]

export const loadProviders = () => {
  return new Promise<Player>(async (resolve) => {
    provider.add(Config, Config)
    provider.add(Speed, Speed)
    provider.add(Position, Position)
    provider.add(Control, GamepadControl)
    provider.add(AxesHandler, GamepadAxesHandler)
    provider.add(ButtonsHandler, GamepadButtonsHandler)
    provider.add(CanvasContext, config.ctx)
    await provider.add(PlayerAnimation, loadFrames(FRAMES, config.size))
    provider.add(PlayerFrame, PlayerFrame, [PlayerAnimation])
    provider.add(Player, Player, [...PlayerDeps])
    resolve(provider.use(Player))
  })
}
