import { MQ } from '../utils/breakpoints.js'

const paths = document.querySelectorAll('.home--hero_svg path')
gsap.set(paths, { autoAlpha: 0, y: '1rem' })

function animateHeroSvg() {
  if (!paths.length) return

  gsap.to(paths, {
    autoAlpha: 1,
    duration: 1.6,
    y: '0rem',
    stagger: { each: 0.04, from: 'end' },
    ease: 'power2.out',
  })
}

function initLogoRevealLoader() {
  gsap.registerPlugin(CustomEase, SplitText)
  CustomEase.create('loader', '0.65, 0.01, 0.05, 0.99')

  const wrap = document.querySelector('[data-load-wrap]')
  if (!wrap) return

  const isReturning = sessionStorage.getItem('rfg-visited')
  sessionStorage.setItem('rfg-visited', '1')

  const container = wrap.querySelector('[data-load-container]')
  const bg = wrap.querySelector('[data-load-bg]')
  const progressBar = wrap.querySelector('[data-load-progress]')
  const logo = wrap.querySelector('[data-load-logo]')

  // Reset targets
  const resetTargets = Array.from(wrap.querySelectorAll('[data-load-reset]'))

  // Main loader timeline
  const loadTimeline = gsap
    .timeline({
      defaults: {
        ease: 'loader',
        duration: 2,
      },
    })
    .set(wrap, { display: 'block' })
    .to(progressBar, { scaleX: 1 })
    .to(logo, { clipPath: 'inset(0% 0% 0% 0%)' }, '<')
    .to(container, { autoAlpha: 0, duration: 0.5 })
    .to(progressBar, { scaleX: 0, transformOrigin: 'right center', duration: 0.5 }, '<')
    .add('hideContent', '<')
    .to(bg, { yPercent: -101, duration: 1 }, 'hideContent')
    .add(() => animateHeroSvg(), '-=0.6')
    .set(wrap, { display: 'none' })

  if (isReturning) loadTimeline.timeScale(1.5)

  if (resetTargets.length) {
    loadTimeline.set(resetTargets, { autoAlpha: 1 }, 0)
  }
}

const initHeroParallax = () => {
  const hero = document.querySelector('[data-hero-target]')
  if (!hero) return
  const mm = gsap.matchMedia()
  mm.add(MQ.tabletUp, () => {
    const animateHero = () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: '[data-hero-trigger]',
          start: 'clamp(top 100%)',
          end: 'top top',
          scrub: true,
        },
      })

      tl.to(
        hero,
        {
          y: '35vh',
          // filter: 'brightness(30%)',
          ease: 'none',
        },
        0
      )

      tl.to(
        '.home--hero_svg',
        {
          y: '35vh',
          ease: 'none',
        },
        0
      )

      tl.to(
        '.home--hero_img',
        {
          scale: '1.15',
          ease: 'none',
        },
        0
      )

      // gsap.set(hero, { filter: 'brightness(100%)' })
    }

    animateHero()
  })
  // Remove animations on tablet and down
  mm.add(MQ.tabletDown, () => {
    gsap.set(hero, { clearProps: 'all' })
    ScrollTrigger.refresh()
  })
}

const initHomeProjects = () => {
  const target = document.querySelector('.home--projects_title-inner')
  const trigger = document.querySelector('.home--projects_list-wrap')
  if (!trigger) return

  const tl = gsap.timeline({
    defaults: {
      ease: 'none',
    },
    scrollTrigger: {
      trigger: trigger,
      start: 'clamp(top 80%)',
      end: 'top top',
      scrub: true,
    },
  })

  tl.to(
    target,
    {
      scale: 0.6,
      ease: 'none',
    },
    0
  )
}

export function initHome() {
  // Home page logic
  initLogoRevealLoader()
  initHeroParallax()
  initHomeProjects()
}
