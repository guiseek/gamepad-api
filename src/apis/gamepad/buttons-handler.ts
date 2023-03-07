import {ButtonsHandler} from '../buttons-handler'
import {buttonActive} from './button-active'

type InputButtonsHandle = GamepadButton

export class GamepadButtonsHandler
  implements ButtonsHandler<InputButtonsHandle>
{
  handle(buttons: readonly GamepadButton[]): boolean[] {
    const [X, A, B, Y, L, R] = buttons

    return [
      buttonActive(X),
      buttonActive(A),
      buttonActive(B),
      buttonActive(Y),
      buttonActive(L),
      buttonActive(R),
    ]
  }

  isActive(button: Readonly<GamepadButton>): boolean {
    return !!(button.pressed || button.touched || button.value)
  }
}
