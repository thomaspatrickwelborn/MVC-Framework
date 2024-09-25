import { Control } from '/dependencies/mvc-framework.js'
import ControlParameters from './control.js'
document.addEventListener('DOMContentLoaded', ($event) => {
  const control = new Control(...ControlParameters)
  control.start()
}, { once: true })