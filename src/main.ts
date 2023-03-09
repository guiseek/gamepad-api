import {loadProviders} from './providers'

loadProviders().then((player) => {
  player.init()
})
