import {FRAMES, Player} from './core/player'
import {loadFrames} from './core/load-frames'
import {config} from './core/config'
import './style.css'

loadFrames(FRAMES, config.size).then((animation) => {
  const player = new Player(config.ctx, animation)
  player.init()
})
