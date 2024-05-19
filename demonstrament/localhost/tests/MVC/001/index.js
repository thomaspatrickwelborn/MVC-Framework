import {
  Model, View, Control, StaticRouter
} from '/mvc-framework/index.js'
import Header from './header/index.js'

function DOMContentLoaded() {
  const header = new Header()
  console.log(header.start())
}

document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)