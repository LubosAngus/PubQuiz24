/**
 * TODO: Refactor this, I belive it can be simplified
 */

import gsap from 'gsap'

const onEnter = (
  el: Element,
  done: () => void,
  startDelay: number = 0,
): void => {
  const DURATION = 1.5 // 1.5

  const tl = gsap.timeline({
    onComplete: done,
    delay: startDelay,
  })

  const bgEls = [...el.querySelectorAll('.js-content')]

  for (let i = 0; i < bgEls.length; i++) {
    const bgEl = bgEls[i]

    tl.fromTo(
      bgEl!,
      {
        translateY: '100%',
      },
      {
        translateY: 0,

        duration: DURATION,
        ease: 'power4.out',
      },
      i > 0 ? '<0.05' : undefined,
    )

    tl.fromTo(
      bgEl!.querySelectorAll('.js-text'),
      {
        translateY: '-120%',
        translateZ: 0,
      },
      {
        translateY: 0,
        translateZ: 0,

        duration: DURATION,
        ease: 'power4.out',
      },
      '<',
    )
  }
}

const onLeave = (
  el: Element,
  done: () => void,
  startDelay: number = 0,
): void => {
  const DURATION = 1.5 // 1.5

  const tl = gsap.timeline({
    onComplete: done,
    delay: startDelay + 1 / 100,
  })

  const bgEls = [...el.querySelectorAll('.js-content')]

  for (let i = 0; i < bgEls.length; i++) {
    const bgEl = bgEls[i]

    tl.fromTo(
      bgEl!,
      {
        translateY: 0,
      },
      {
        translateY: '-100%',

        duration: DURATION,
        ease: 'power4.out',
      },
      i > 0 ? '<0.05' : undefined,
    )

    tl.fromTo(
      bgEl!.querySelectorAll('.js-text'),
      {
        translateY: 0,
        translateZ: 0,
      },
      {
        translateY: '120%',
        translateZ: 0,

        duration: DURATION,
        ease: 'power4.out',
      },
      '<',
    )
  }
}

export default {
  onEnter,
  onLeave,
}
