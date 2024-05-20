import { Model, View, Control, StaticRouter } from '/mvc-framework/index.js'
import HeaderControl from './header/index.js'
import MainControl from './main/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import controlParameters from './control.js'
import routerParameters from './router.js'
export default class AppControl extends Control {
  constructor() {
    super(...arguments)
    this.addClassInstances({
      models: {
        model: new Model(...modelParameters)
      },
      views: {
        view: new View(...viewParameters)
      },
      controls: {
        header: new HeaderControl().start(),
        main: new MainControl().start(),
      },
      routers: {
        router: new StaticRouter(...routerParameters),
      }
    })
    this.addEvents({
      'controls.header navigate': function headerNavigate($event) {
        this.routers.router.navigate($event.detail.link)
      },
    }, true)
  }
  start() {
    // console.log(this.views.view.element.replaceChildren)
    // console.log(this.controls.header.views.view.element.content)
    this.views.view.element.replaceChildren(
      this.controls.header.views.view.element.content,
      this.controls.main.views.view.element.content,
    )
  }
}