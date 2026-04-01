import { MQ } from '../utils/breakpoints.js'

export function initBrandOverview() {
  const indicator = document.querySelector('.scroll-indicator_component')
  if (!indicator) return

  gsap.to(indicator, {
    autoAlpha: 0,
    duration: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: document.body,
      start: '10px top',
      end: '10px top',
      toggleActions: 'play none none reverse',
    },
  })
}
