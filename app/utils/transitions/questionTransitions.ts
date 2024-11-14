/**
 * TODO: Refactor this, I belive it can be simplified
 */

import gsap from 'gsap'

const onEnter = (
  el: Element,
  done: () => void,
  startDelay: number = 0,
): void => {
  const DURATION = 1

  const tl = gsap.timeline({
    onComplete: done,
    delay: startDelay,
  })

  const wordEls = [...el.querySelectorAll('.js-word')]

  for (let i = 0; i < wordEls.length; i++) {
    const wordEl = wordEls[i]

    let randomPosition = 0

    if (i > 0) {
      randomPosition = getRandomNumber(0.1, 0.35)
    }

    tl.fromTo(
      wordEl!,
      {
        translateZ: 0,
        translateY: '120%',
        opacity: 0.9,
      },
      {
        translateZ: 0,
        translateY: 0,
        opacity: 1,

        duration: DURATION,
        ease: 'power3.out',
      },
      randomPosition,
    )
  }

  if (el.querySelector('.js-image')) {
    tl.fromTo(
      el.querySelector('.js-image'),
      {
        translateZ: 0,
        translateY: '120%',
        opacity: 0.9,
      },
      {
        translateZ: 0,
        translateY: 0,
        opacity: 1,

        duration: DURATION,
        ease: 'power3.out',
      },
      0.2,
    )
  }
}

const onLeave = (
  el: Element,
  done: () => void,
  startDelay: number = 0,
): void => {
  const DURATION = 0.3

  const tl = gsap.timeline({
    onComplete: done,
    delay: startDelay,
  })

  const wordEls = [...el.querySelectorAll('.js-word')]

  for (let i = 0; i < wordEls.length; i++) {
    const wordEl = wordEls[i]

    let randomPosition = 0

    if (i > 0) {
      randomPosition = getRandomNumber(0.05, 0.2)
    }

    tl.fromTo(
      wordEl!,
      {
        translateZ: 0,
        translateY: 0,
        opacity: 1,
      },
      {
        translateZ: 0,
        translateY: '-100%',
        opacity: 0.9,

        duration: DURATION,
        ease: 'power2.in',
      },
      randomPosition,
    )
  }

  if (el.querySelector('.js-image')) {
    tl.fromTo(
      el.querySelector('.js-image'),
      {
        translateZ: 0,
        translateY: 0,
        opacity: 1,
      },
      {
        translateZ: 0,
        translateY: '-100%',
        opacity: 0.9,

        duration: DURATION,
        ease: 'power2.in',
      },
      0.1,
    )
  }
}

const answerRevealOnEnter = (el: Element, done: () => void): void => {
  const DURATION = 1

  const tl = gsap.timeline({
    onComplete: done,
    delay: 0.3,
  })

  const wordEls = [...el.querySelectorAll('.js-word')]

  for (let i = 0; i < wordEls.length; i++) {
    const wordEl = wordEls[i]

    let randomPosition = 0

    if (i > 0) {
      randomPosition = getRandomNumber(0.05, 0.2)
    }

    tl.fromTo(
      wordEl!,
      {
        opacity: 0,
      },
      {
        opacity: 1,

        duration: DURATION,
        ease: 'power.out',
      },
      randomPosition,
    )
  }

  if (el.querySelector('.js-image')) {
    tl.fromTo(
      el.querySelector('.js-image'),
      {
        opacity: 0,
      },
      {
        opacity: 1,

        duration: DURATION,
        ease: 'power.out',
      },
      0,
    )
  }
}

const answerRevealOnLeave = (el: Element, done: () => void): void => {
  const DURATION = 0.5

  const tl = gsap.timeline({
    onComplete: done,
  })

  const wordEls = [...el.querySelectorAll('.js-word')]

  for (let i = 0; i < wordEls.length; i++) {
    const wordEl = wordEls[i]

    let randomPosition = 0

    if (i > 0) {
      randomPosition = getRandomNumber(0.05, 0.2)
    }

    tl.fromTo(
      wordEl!,
      {
        opacity: 1,
      },
      {
        opacity: 0,

        duration: DURATION,
        ease: 'power.out',
      },
      randomPosition,
    )
  }

  if (el.querySelector('.js-image')) {
    tl.fromTo(
      el.querySelector('.js-image'),
      {
        opacity: 1,
      },
      {
        opacity: 0,

        duration: DURATION,
        ease: 'power.out',
      },
      0.1,
    )
  }
}

export default {
  onEnter,
  onLeave,
  answerRevealOnEnter,
  answerRevealOnLeave,
}
