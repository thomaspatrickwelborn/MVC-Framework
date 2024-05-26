import { Control } from '/mvc-framework/index.js'
export default class PhotoSelector extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      models: {
        default: {
          content: {
            selectorIndex: 0,
            photos: [],
          },
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
              return this.templates.photoSelector($content.photos)
            },
          },
          selectors: {
            photoSelector: 'photo-selector',
            photos: 'photo-selector > photos',
            photo: 'photo-selector > photos > photo',
            img: 'photo-selector > photos > photo > img',
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
        },
      }},
      events: {
        'views.default render': function renderDefaultView($event) {
          for(const $event of this.getEventsByEventSettings({
            type: 'click',
            target: 'views.default.selectors.photoSelector',
          })) {
            $event.enable = true
          }
        },
        'views.default.selectors.photoSelector click': function defaultViewPhotoSelectorClick($event) {
          console.log($event.type, $event.detail)
        },
        'routers.fetch.default.routes.photos get:status:200': async function photosStatus($event) {
          const content = await $event.detail.response.json()
          this.models.default.content.photos.push(...content)
        },
        'models.default.content assignSourceProperty:selectorIndex': function defaultModelSelectorIndexAssignSourceProperty($event) {
          this.views.default.selectors.photo.forEach(($photo, $photoIndex) => {
            const selectorIndex = $event.detail.val
            if($photoIndex === selectorIndex) {
              $photo.setAttribute('data-selected', true)
            } else {
              $photo.removeAttribute('data-selected')
            }
          })
        },
        'models.default.content.photos push': function defaultPhotosModelPhotosPush($event) {
          this.views.default.renderElement({
            templateName: 'default',
            content: this.models.default.content,
          })
        },
      },
    }), Object.assign($options, {}))
  }
  start() {
    this.routers.fetch.default.routes.photos.get()
    return this
  }
}