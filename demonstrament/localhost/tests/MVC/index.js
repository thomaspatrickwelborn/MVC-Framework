import Research from '/coutil/Research/index.js'
import DET from './DET/index.js'
// import DES from './DES/index.js'
function DOMContentLoaded() {
  const research = new Research({
    type: "research",
    title: "MVC Framework Research",
    topics: [
      DET(),
      // DES()
    ],
    parent: document.querySelector('mvc-framework'),
  })
}
document.addEventListener(
  'DOMContentLoaded', 
  DOMContentLoaded
)
