import {ButtonsHandler} from '../buttons-handler'

type InputButtonsHandle = GamepadButton

export class GamepadButtonsHandler
  implements ButtonsHandler<InputButtonsHandle>
{
  handle(buttons: readonly GamepadButton[]): boolean[] {
    const [X, A, B, Y, L, R] = buttons

    return [
      this.isActive(X),
      this.isActive(A),
      this.isActive(B),
      this.isActive(Y),
      this.isActive(L),
      this.isActive(R),
    ]
  }

  isActive(button: Readonly<GamepadButton>): boolean {
    return !!(button.pressed || button.touched || button.value)
  }
}
