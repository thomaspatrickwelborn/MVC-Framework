import { ServerRouter, Model } from '/mvc-framework/index.js'

function DOMContentLoaded() {
  const serverModel = new Model({
    content: {
      photos: {},
    }
  })
  const serverRouter = new ServerRouter({
    scheme: 'http',
    domain: 'demonstrament.mvc-framework',
    port: 3000,
    routes: {
      '/services/photos': {
        name: 'photos',
        methods: {
          get: {
            method: 'get',
          }
        }
      }
    },
    events: {
      'routes.photos status': async function photosStatus($event) {
        console.log($event.type, $event.detail)
      }
    }
  }, { enableEvents: true })
  serverRouter.routes.photos.get()
  console.log('serverRouter', serverRouter)
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)

// /graphics/photos