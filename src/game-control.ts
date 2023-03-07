type GameCallback = (currentTime: number, gamepad: Gamepad | null) => void

interface GameAnimation {
  animation: number
  cancel(): void
}

export class GamepadControl {
  #animations: GameAnimation[] = []

  #onGamepads: GameCallback[] = []
  set onGamepad(cb: GameCallback) {
    this.#onGamepads.push(cb)
  }

  get paused() {
    return this.#animations.length === 0
  }

  #init() {
    let animation: number, cancel

    const animationFn = (currentTime: number) => {
      animation = requestAnimationFrame(animationFn)
      cancel = () => cancelAnimationFrame(animation)

      for (const gp of navigator.getGamepads()) {
        for (const cb of this.#onGamepads) cb(currentTime, gp)
      }

      return {animation, cancel}
    }

    const {currentTime} = document.timeline
    return animationFn(currentTime ?? Date.now())
  }

  run = () => {
    const animation = this.#init()
    this.#animations.push(animation)
    return animation
  }

  cancel = () => {
    for (const a of this.#animations) a.cancel()
  }
}
