export function getAnimationKey(buttons: boolean[]): AnimationKey {
  const [tilt, frontFlip, running, backFlip, hartAttack, superMan] = buttons

  if (tilt) return 'tilt'
  if (frontFlip) return 'frontFlip'
  if (running) return 'running'
  if (backFlip) return 'backFlip'
  if (hartAttack) return 'hartAttack'
  if (superMan) return 'superMan'
  else return 'waiting'
}
