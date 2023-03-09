export abstract class ButtonsHandler<T = unknown> {
  abstract handle(value: readonly T[]): boolean[]
  abstract isActive(value: T): boolean
}
