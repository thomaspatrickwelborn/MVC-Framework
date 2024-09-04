import Research from '/coutil/Research/index.js'
import DET from './DET/index.js'
function DOMContentLoaded() {
  const research = new Research({
    title: "MVC Framework Research",
    topics: [
      DET(),
    ]
  })
}
document.addEventListener(
  'DOMContentLoaded', 
  DOMContentLoaded
)
