import { DynamicEventTarget } from '/dependencies/mvc-framework.js'

function DOMContentLoaded() {
  console.log('hello dogs')
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
