import {AxesHandler} from '../alex-handler'

type InputAxesHandle = number

export class GamepadAxesHandler implements AxesHandler<InputAxesHandle> {
  handle([x, y]: readonly InputAxesHandle[]): {x: number; y: number} {
    return {x: +x.toFixed(0), y: -y.toFixed(0)}
  }
  isActive(value: InputAxesHandle): boolean {
    return +value.toFixed(0) > 0 || +value.toFixed(0) < 0
  }
}
