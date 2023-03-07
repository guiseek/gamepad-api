import {loadImage} from './load-image'
import {Offscreen} from './offscreen'

export const loadFrames = async (frames: Frames<AnimationKey>, size = 1000) => {
  const animation = {} as AnimationFrame<AnimationKey>
  return Promise.all(
    frames.map(async ([src, key, index]) => {
      const offscreen = new Offscreen(size, size)
      const image = await loadImage(src, size, size)
      offscreen.context.drawImage(image, 0, 0, size, size)
      
      if (!animation[key]) animation[key] = []
      animation[key][index] = offscreen.canvas
    })
  ).then(() => animation)
}
