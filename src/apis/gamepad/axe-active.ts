export function axeActive(value: number) {
  return +value.toFixed(0) > 0 || +value.toFixed(0) < 0
}