function setCss(ele, styles) {
  for (const key in styles) {
    ele.style[key] = styles[key]
  }
}

function setAttrs(ele, attrs) {
  for (const key in attrs) {
    ele.setAttribute(key, attrs[key])
  }
}

function hasScrollbar() {
  return window.innerWidth > document.body.clientWidth
}

var throttlePause
function throttle(cb, delay) {
  if (throttlePause) return

  throttlePause = true

  setTimeout(() => {
    cb && cb()
    throttlePause = false
  }, delay)
}

var installed
if (hasScrollbar() && !installed) {
  const manifestData = chrome.runtime.getManifest()

  const styles = {
    backgroundColor: '#ffc107',
    color: '#000',
    width: '60px',
    height: '60px',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: '30px',
    right: '20px',
    borderRadius: '50%',
    outline: 'none',
    border: 'none',
    zIndex: '2147483647',
    userSelect: 'none',
    cursor: 'pointer'
  }
  const svgNs = 'http://www.w3.org/2000/svg'
  const svgPath = 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z'
  const svgAttrs = {
    height: '26',
    width: '26',
    viewBox: '0 0 26 26',
    fill: 'currentColor'
  }

  const ele = document.createElement('div')
  ele.id = `back-to-top-v${manifestData.version}`
  setCss(ele, styles)
  ele.onclick = function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', () => {
    throttle(() => {
      if (
        document.body.scrollTop > 30 ||
        document.documentElement.scrollTop > 30
      ) {
        ele.style.display = 'flex'
      } else {
        ele.style.display = 'none'
      }
    }, 250)
  })

  const svg = document.createElementNS(svgNs, 'svg')
  setAttrs(svg, svgAttrs)

  const path = document.createElementNS(svgNs, 'path')
  path.setAttributeNS(null, 'd', svgPath)

  svg.appendChild(path)
  ele.appendChild(svg)
  document.body.appendChild(ele)

  installed = true
}
