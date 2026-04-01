console.log('Nav!')

function initNav() {
  const navStatusEl = document.querySelector('[data-navigation-status]')
  if (!navStatusEl) return

  const trigger = document.querySelector('[data-hero-trigger]')
  const alwaysBlend = trigger?.getAttribute('data-hero-trigger') === 'always'

  let blendActive = false

  function setNav(active) {
    navStatusEl.setAttribute('data-navigation-status', active ? 'active' : 'not-active')
    if (active) {
      navStatusEl.classList.remove('is-blend')
    } else if (blendActive) {
      navStatusEl.classList.add('is-blend')
    }
  }

  // Toggle Navigation
  document.querySelectorAll('[data-navigation-toggle="toggle"]').forEach((toggleBtn) => {
    toggleBtn.addEventListener('click', () => {
      const isActive = navStatusEl.getAttribute('data-navigation-status') === 'active'
      setNav(!isActive)
    })
  })

  // Close Navigation
  document.querySelectorAll('[data-navigation-toggle="close"]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => setNav(false))
  })

  // Key ESC - Close Navigation
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27 && navStatusEl.getAttribute('data-navigation-status') === 'active') {
      setNav(false)
    }
  })

  // Nav Blend
  if (trigger) {
    if (alwaysBlend) {
      blendActive = true
      navStatusEl.classList.add('is-blend')
    } else {
      ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => { blendActive = true; navStatusEl.classList.add('is-blend') },
        onEnterBack: () => { blendActive = true; navStatusEl.classList.add('is-blend') },
        onLeaveBack: () => { blendActive = false; navStatusEl.classList.remove('is-blend') },
      })
    }
  }
}

export { initNav }
