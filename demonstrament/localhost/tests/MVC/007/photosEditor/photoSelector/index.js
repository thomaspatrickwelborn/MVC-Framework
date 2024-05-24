import { Control } from '/mvc-framework/index.js'
export default class PhotoSelector extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      models: {
        default: {
          content: [],
        },
      },
      views: {
        default: {
          type: 'dynamic',
          templates: {
            img: function($img) { return `<img src="${
              $img.src
            }" alt="${
              $img.alt
            }" width="${
              $img.width
            }" height="${
              $img.height
            }" />` },
            photo: function($photo) { return `<photo>${
              this.templates.img($photo.img)
            }</photo>` },
            photos: function($photos) { return `<photos>${
              $photos.map(($photo) => this.templates.photo($photo)).join('\n')
            }</photos>` },
            photoSelector: function($content) { return `<photo-selector>${
              this.templates.photos($content)
            }</photo-selector>` },
            default: function($content) {
              return this.templates.photoSelector($content)
            },
          },
        }
      },
      routers: { fetch: {
        // Photos Editor Router
        default: {
          scheme: 'http',
          domain: 'demonstrament.mvc-framework',
          port: 3000,
          routes: {
            '/services/photos': {
              name: 'photos',
              methods: {
                get: {
                  method: 'get',
                },
              },
            }
          },
        }
      }},
      events: {
        'routers.fetch.default.routes.photos get:status:200': async function photosStatus($event) {
          const content = await $event.detail.response.json()
          this.models.default.content.push(...content)
        },
        'models.default.content push': function defaultModelPush($event) {
          this.views.default.renderElement({
            templateName: 'default',
            content: this.models.default.content,
          })
          // this.views.default.parentElement.replaceChildren(
          //   ...this.views.default.element.content.children
          // )
        },
      },
    }), Object.assign($options, {}))
  }
  start() {
    this.routers.fetch.default.routes.photos.get()
    return this
  }
}