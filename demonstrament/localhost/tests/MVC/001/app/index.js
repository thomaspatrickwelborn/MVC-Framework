import { Control } from '/mvc-framework/index.js'
import HeaderControl from './header/index.js'
import MainControl from './main/index.js'
import controlParameters from './control.js'

export default class AppControl extends Control {
  constructor() {
    super(...arguments)
    this.addClassInstances({
      header: new HeaderControl(),
      main: new MainControl(),
    })
  }
  start() {
    console.log(this)
  }
}