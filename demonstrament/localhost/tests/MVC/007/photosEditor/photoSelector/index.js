import { Control } from '/mvc-framework/index.js'
export default class PhotoSelector extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      models: {
        default: {
          content: {
            _id: '',
            index: 0,
            photos: [],
          },
        },
      },
      views: {
        default: {
          type: 'dynamic',
          templates: {
            img: function photoImgTemplate($img) { return `<img src="${
              $img.src
            }" alt="${
              $img.alt
            }" width="${
              $img.width
            }" height="${
              $img.height
            }" />` },
            photo: function photoTemplate($photo, $photoIndex) { return `<photo data-id="${
              $photo._id
            }" data-index="${
              $photoIndex
            }">${
              this.templates.img($photo.img)
            }</photo>` },
            photos: function photosTemplate($photos) { return `<photos>${
              $photos.map(($photo, $photoIndex) => this.templates.photo($photo, $photoIndex)).join('\n')
            }</photos>` },
            photoSelector: function photoSelectorTemplate($content) { return `<photo-selector>${
              this.templates.photos($content)
            }</photo-selector>` },
            default: function defaultTemplate($content) {
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
        // A. Default View Events
        // A.1. Default View Render
        'views.default render': 
        function renderDefaultView($event) {
          this.enableEvents(
            this.getEvents({
              type: 'click',
              target: 'views.default.selectors.photoSelector',
            })
          )
        },
        // A.2. Default View Selector Photo Click
        'views.default.selectors.photo click': 
        function defaultViewPhotoClick($event) {
          const index = Number(
            $event.currentTarget.getAttribute('data-index')
          )
          const _id = String(
            $event.currentTarget.getAttribute('data-id')
          )
          this.models.default.content.assign({ index, _id })
        },
        // B. Default Fetch Router Events
        // B.1. Default Fetch Router Photos Route GET Status "200"
        'routers.fetch.default.routes.photos get:status:200': 
        async function photosStatus($event) {
          const content = await $event.detail.response.json()
          this.models.default.content.photos.push(...content)
        },
        // C. Default Models Events
        // C.1. Default Model Assign Source Property "Index"
        'models.default.content assignSourceProperty:index': 
        function defaultModelIndexAssignSourceProperty($event) {
          this.views.default.selectors.photo.forEach(($photo, $photoIndex) => {
            const index = $event.detail.val
            if($photoIndex === index) {
              $photo.setAttribute('data-selected', true)
            } else {
              $photo.removeAttribute('data-selected')
            }
          })
        },
        // C.2. Default Model Push Property "Photos"
        'models.default.content.photos push': 
        function defaultModelPhotosPush($event) {
          this.views.default.renderElement({
            templateName: 'default',
            content: this.models.default.content,
          })
          const { _id } = $event.detail.elements[0]
          this.models.default.content.assign({ index: 0, _id })
        },
      },
    }), Object.assign($options, {}))
  }
  start() {
    this.routers.fetch.default.routes.photos.get()
    return this
  }
}