import { Model, View, Control, StaticRouter, ServerRouter } from '/mvc-framework/index.js'
import HeaderControl from './header/index.js'
import MainControl from './main/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import staticRouterParameters from './static-router.js'
import serverRouterParameters from './server-router.js'
export default class AppControl extends Control {
  constructor() {
    super(...arguments)
    this.addClassInstances({
      models: {
        model: new Model(...modelParameters),
      },
      views: {
        view: new View(...viewParameters),
      },
      controls: {
        header: new HeaderControl().start(),
        main: new MainControl().start(),
      },
      routers: {
        static: { router: new StaticRouter(...staticRouterParameters) },
        server: { router: new ServerRouter(...serverRouterParameters) },
      },
    })
    this.addEvents({
      'controls.header navigate': function headerNavigate($event) {
        window.location.hash = $event.detail.link
      },
      'routers.server.router ok': async function routerOK($event) {
        console.log(await $event.detail.json())
      },
      'routers.server.router status': async function routerStatus($event) {
        console.log(await $event.detail.json())
      },
      'routers.server.router status:200': async function routerStatus200($event) {
        console.log(await $event.detail.json())
      },
      'routers.server.router statusText': async function routerStatusText($event) {
        console.log(await $event.detail.json())
      },
      'routers.server.router statusText:OK': async function routerStatusTextOK($event) {
        console.log(await $event.detail.json())
      },
    }, true)
    console.log(this)
  }
  start() {
    this.routers.server.router.routes['/services/topics'].get()
    this.views.view.element.replaceChildren(
      this.controls.header.views.view.element.content,
      this.controls.main.views.view.element.content,
    )
  }
}