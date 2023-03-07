export class PlayerFrame {
  #index = 0
  get index() {
    return this.#index
  }

  #key: AnimationKey = 'waiting'
  get key() {
    return this.#key
  }

  #lastKey: AnimationKey = this.key
  get lastKey() {
    return this.#lastKey
  }

  get frames() {
    return this.animation[this.key]
  }

  get currentFrame() {
    return this.frames[this.index]
  }

  constructor(readonly animation: AnimationFrame<AnimationKey>) {}

  select(buttons: boolean[]) {
    const animationKey = this.#handleButtons(buttons)
    this.#setKey(animationKey)

    const isSequence = this.frames.length > 1
    const hasNextIndex = this.index < this.frames.length
    if (isSequence && hasNextIndex) this.#next()
    else if (animationKey !== this.lastKey) this.#reset()

    this.#setLastKey(animationKey)
  }

  #setKey(key: AnimationKey) {
    this.#key = key
  }

  #setLastKey(key: AnimationKey) {
    this.#lastKey = key
  }

  #next() {
    this.#index += 1
  }

  #reset() {
    this.#index = 0
    this.#key = 'waiting'
  }

  #handleButtons(buttons: boolean[]): AnimationKey {
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
