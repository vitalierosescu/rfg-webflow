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

  // Returning visitor: quick loader fade out
  if (sessionStorage.getItem('rfg-visited')) {
    gsap.to(wrap, {
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power1.out',
      onComplete: () => {
        gsap.set(wrap, { display: 'none' })
        animateHeroSvg()
      },
    })
    return
  }
  sessionStorage.setItem('rfg-visited', '1')

  const container = wrap.querySelector('[data-load-container]')
  const bg = wrap.querySelector('[data-load-bg]')
  const progressBar = wrap.querySelector('[data-load-progress]')
  const logo = wrap.querySelector('[data-load-logo]')
  const textElements = Array.from(wrap.querySelectorAll('[data-load-text]'))

  // Reset targets that are * not * split text targets
  const resetTargets = Array.from(wrap.querySelectorAll('[data-load-reset]:not([data-load-text])'))

  // Main loader timeline
  const loadTimeline = gsap
    .timeline({
      defaults: {
        ease: 'loader',
        duration: 3,
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

  // If there are items to hide FOUC for, reset them at the start
  if (resetTargets.length) {
    loadTimeline.set(resetTargets, { autoAlpha: 1 }, 0)
  }

  // If there's text items, split them, and add to load timeline
  if (textElements.length >= 2) {
    const firstWord = new SplitText(textElements[0], { type: 'lines,chars', mask: 'lines' })
    const secondWord = new SplitText(textElements[1], { type: 'lines,chars', mask: 'lines' })

    // Set initial states of the text elements and letters
    gsap.set([firstWord.chars, secondWord.chars], { autoAlpha: 0, yPercent: 125 })
    gsap.set(textElements, { autoAlpha: 1 })

    // first text in
    loadTimeline.to(
      firstWord.chars,
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.6,
        stagger: { each: 0.02 },
      },
      0
    )

    // first text out while second text in
    loadTimeline.to(
      firstWord.chars,
      {
        autoAlpha: 0,
        yPercent: -125,
        duration: 0.4,
        stagger: { each: 0.02 },
      },
      '>+=0.4'
    )

    loadTimeline.to(
      secondWord.chars,
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.6,
        stagger: { each: 0.02 },
      },
      '<'
    )

    // second text out
    loadTimeline.to(
      secondWord.chars,
      {
        autoAlpha: 0,
        yPercent: -125,
        duration: 0.4,
        stagger: { each: 0.02 },
      },
      'hideContent-=0.5'
    )
  }
}

function initOutroAnimation() {
  const trigger = document.querySelector('.outro_img-wrap')
  if (!trigger) return
  const swipe = trigger.querySelector('.img-swipe')

  gsap.to(swipe, {
    scaleX: 0,
    ease: 'power3.inOut',
    duration: 1.8,
    scrollTrigger: {
      trigger: trigger,
      start: 'top 95%',
      toggleActions: 'play none none none',
    },
  })
}

const initHeroParallax = () => {
  const hero = document.querySelector('[data-hero-target]')
  if (!hero) return
  const mm = gsap.matchMedia()
  mm.add('(min-width: 992px)', () => {
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
  mm.add('(max-width: 991px)', () => {
    gsap.set(hero, { clearProps: 'all' })
    ScrollTrigger.refresh()
  })
}

export function initHome() {
  // Home page logic
  initLogoRevealLoader()
  initOutroAnimation()
  initHeroParallax()
}
