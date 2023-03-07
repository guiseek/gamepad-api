export abstract class AxesHandler<T = Readonly<number>> {
  abstract handle(value: T[]): {x: number; y: number}
  abstract isActive(value: T): boolean
}
