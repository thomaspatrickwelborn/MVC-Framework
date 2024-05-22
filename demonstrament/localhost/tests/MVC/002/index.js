import { FetchRouter, Model } from '/mvc-framework/index.js'

function DOMContentLoaded() {
  const photosModel = new Model({
    content: [],
    events: {
      'content push': function photosPush($event) {
        console.log($event.type, $event.detail)
      },
    },
  })
  const fetchRouter = new FetchRouter({
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
        const photos = await $event.detail.json()
        photosModel.content.push(...photos)
        console.log('photosModel.content', photosModel.content)
      },
    },
  }, { enableEvents: true })
  fetchRouter.routes.photos.get()
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)

// /graphics/photos