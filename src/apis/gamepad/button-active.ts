export function buttonActive(button: GamepadButton) {
  return !!(button.pressed || button.touched || button.value)
}
