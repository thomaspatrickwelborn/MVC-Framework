import Research from '/coutil/Research/index.js'
import DET from './DET/index.js'
function DOMContentLoaded() {
  const research = new Research({
    type: "research",
    title: "MVC Framework Research",
    topics: [
      DET(),
    ],
    parent: document.querySelector('mvc-framework'),
  })
}
document.addEventListener(
  'DOMContentLoaded', 
  DOMContentLoaded
)
