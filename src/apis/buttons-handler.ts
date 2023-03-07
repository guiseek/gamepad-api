export abstract class ButtonsHandler<T> {
  abstract handle(value: T[]): boolean[]
  abstract isActive(value: T): boolean
}
