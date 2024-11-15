import katex from 'katex'
import 'katex/dist/katex.min.css'

function renderEquation (el) {
  if (!el) return

  let equation = el.getAttribute('title').slice('tex-render '.length)

  if (!equation) return

  let equationEl = document.createElement('span')

  katex.render(equation, equationEl, {
    throwOnError: false,
  })
  equationEl.setAttribute('title', equation)
  equationEl.classList.add('tex-rendered')
  el.replaceWith(equationEl)
}

function initRenderEquation () {
  const elements = document.querySelectorAll('a[title^="tex-render "]')
  if (elements.length === 0) return

  elements.forEach(renderEquation)
}

export function onRouteDidUpdate ({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    initRenderEquation()
  }
}
