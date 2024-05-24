import Photos from './photos/index.js'

function DOMContentLoaded() {
  // Photos
  const photos = new Photos().start()
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)
