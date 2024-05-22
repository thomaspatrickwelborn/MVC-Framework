import { Model, View, Control, StaticRouter, FetchRouter } from '/mvc-framework/index.js'
import HeaderControl from './header/index.js'
import MainControl from './main/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import staticRouterParameters from './static-router.js'
import fetchRouterParameters from './server-router.js'
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
        server: { router: new FetchRouter(...fetchRouterParameters) },
      },
    })
    this.addEvents({
      'models.model.content assign': function modelAssign($event) {
        console.log($event.type, $event.detail)
        this.controls.header.views.view.renderTemplate('template', )
      },
      'controls.header navigate': function headerNavigate($event) {
        window.location.hash = $event.detail.link
      },
      'routers.server.router.routes.topics status:200': async function fetchRouterTopicsStatus200($event) {
        console.log(this.models.model.content)
        this.models.model.content.assign(await $event.detail.json())
      },
      'routers.server.router.routes.topics abort': function fetchRouterTopicsAbort($event) {
        console.log($event.type, $event.detail)
      },
    }, true)
    this.routers.server.router.routes.topics.get()
  }
  start() {
    this.views.view.element.replaceChildren(
      this.controls.header.views.view.element.content,
      this.controls.main.views.view.element.content,
    )
  }
}