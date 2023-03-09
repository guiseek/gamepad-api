/// <reference types="vite/client" />

/**
 * Player
 */
interface Position {
  x: number
  y: number
  r: number
}

interface Speed {
  y: number
  r: number
}

type AnimationKey =
  | 'hartAttack'
  | 'superMan'
  | 'backFlip'
  | 'frontFlip'
  | 'landing'
  | 'running'
  | 'tilt'
  | 'waiting'

type Canvas = OffscreenCanvas | HTMLCanvasElement
type CanvasRendering =
  | OffscreenCanvasRenderingContext2D
  | CanvasRenderingContext2D

type Frames<K extends string> = [string, K, number][]
type AnimationFrame<K extends string> = Record<K, Canvas[]>

type LR = 'left' | 'right'
type UD = 'up' | 'down'
type LRUD = LR | UD | 'inactive'

interface Axes {
  x: LR | 'inactive'
  y: UD | 'inactive'
}
