console.log('Nav!')

function initNav() {
  const navStatusEl = document.querySelector('[data-navigation-status]')
  if (!navStatusEl) return

  function setNav(active) {
    navStatusEl.setAttribute('data-navigation-status', active ? 'active' : 'not-active')
    if (active) navStatusEl.classList.remove('is-blend')
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
  const trigger = document.querySelector('[data-hero-trigger]')
  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => navStatusEl.classList.add('is-blend'),
      onEnterBack: () => navStatusEl.classList.add('is-blend'),
      onLeaveBack: () => navStatusEl.classList.remove('is-blend'),
    })
  }
}

export { initNav }
