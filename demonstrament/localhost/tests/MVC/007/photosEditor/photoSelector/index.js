import { Control } from '/mvc-framework/index.js'
export default class PhotoSelector extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      models: {
        default: {
          content: {
            index: 0,
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
            photo: function($photo, $photoIndex) { return `<photo data-id="${
              $photo._id
            }" data-index="${
              $photoIndex
            }">${
              this.templates.img($photo.img)
            }</photo>` },
            photos: function($photos) { return `<photos>${
              $photos.map(($photo, $photoIndex) => this.templates.photo($photo, $photoIndex)).join('\n')
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
          this.enableEvents(
            this.getEvents({
              type: 'click',
              target: 'views.default.selectors.photoSelector',
            })
          )
        },
        'views.default.selectors.photo click': function defaultViewPhotoClick($event) {
          const index = Number(
            $event.currentTarget.getAttribute('data-index')
          )
          this.models.default.content.assign({ index })
        },
        'routers.fetch.default.routes.photos get:status:200': async function photosStatus($event) {
          const content = await $event.detail.response.json()
          this.models.default.content.photos.push(...content)
        },
        'models.default.content assignSourceProperty:index': function defaultModelSelectorIndexAssignSourceProperty($event) {
          this.views.default.selectors.photo.forEach(($photo, $photoIndex) => {
            const index = $event.detail.val
            if($photoIndex === index) {
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
          this.models.default.content.assign({ index: 0 })
        },
      },
    }), Object.assign($options, {}))
  }
  start() {
    this.routers.fetch.default.routes.photos.get()
    return this
  }
}