import { initHome } from './pages/home.js'

;(() => {
  // =============================================
  // GSAP SETUP
  // =============================================
  gsap.registerPlugin(ScrollTrigger)

  // =============================================
  // CONFIG
  // =============================================
  const CONFIG = {
    breakpoints: {
      tablet: 991,
      mobileLandscape: 767,
      mobile: 478,
    },
    selectors: {
      pageWrapper: '.page-wrap',
    },
  }

  // =============================================
  // HELPERS
  // =============================================
  function debounce(fn, delay = 200) {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), delay)
    }
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    const page = document.querySelector(CONFIG.selectors.pageWrapper)
    if (!page) return

    if (page.classList.contains('is-home')) initHome()
  }

  // =============================================
  // START
  // =============================================
  try {
    init()
  } catch (error) {
    console.error('[Main] Failed to initialize:', error)
  }
})()
