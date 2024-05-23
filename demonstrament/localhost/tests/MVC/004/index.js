import { FetchRouter, Model, View, Control } from '/mvc-framework/index.js'

function DOMContentLoaded() {
  // Photos View
  const photosControl = new Control({
    views: { photosView: new View({
      parentElement: document.querySelector('app'),
      selectors: {
        photosControl: 'photos-control',
        photosControlButton: 'photos-control > button',
        photos: 'photos',
        photo: 'photos > photo',
      },
      templates: {
        // Image Template
        img: function imgTemplate($img) {
          return `<img src="${
            $img.src
          }" alt="${
            $img.alt
          }" width="${
            $img.width
          }" height="${
            $img.height
          }" />`
        },
        // Photo Template
        photo: function photoTemplate($photo, $active) {
          let template
          if($active === false) {
            template = `<photo>${
              this.templates.img($photo.img)
            }</photo>`
          } else if($active === true){
            template = `<photo data-active="${$active}">${
              this.templates.img($photo.img)
            }</photo>`
          } else {
            template = ``
          }
          return template
        },
        // Photos Template
        photos: function photosTemplate($photos) {
          return `<photos>${
            $photos.map(
              ($photo, $photoIndex) => this.templates.photo($photo, (
                $photos.currentIndex === $photoIndex
              ))
            ).join('\n')
          }</photos>`
        },
        // Photos Control Template
        photosControl: function photosControlTemplate($photosControl) {
          return `<photos-control>
            <button data-crement="-1">&lt;PRE</button>
            <button data-crement="1">ANT&gt;</button>
          </photos-control>`
        },
        // Default Template
        default: function defaultTemplate($photosContent) {
          return [
            this.templates.photosControl($photosContent),
            this.templates.photos($photosContent),
          ].join('\n')
        },
      },
      // 
    }) },
    models: { photosModel: new Model({
      content: [],
    }) },
    routers: {
      fetch: { photosRouter: new FetchRouter({
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
        },
      }) },
    },
    events: {
      'views.photosView render': function photosViewRender($event) {
        // this.enableEvents()
        console.log(this.events)
      },
      'views.photosView.selectors.photosControlButton click': function photosControlButtonClick($event) {
        const crement = Number($event.target.getAttribute('data-crement'))
        this.models.photosModel.content.assign({ currentIndex: crement })
      },
      'models.photosModel.content push': function photosPush($event) {
        this.views.photosView.renderElement({
          name: 'default', 
          data: this.models.photosModel.content,
        })
        // this.views.photosView.parentElement.replaceChildren(
        //   ...this.views.photosView.element.content.children
        // )
        this.enableEvents()
      },
      'models.photosModel.content setCurrentIndex': function setCurrentIndex($event) {
        const { currentIndex } = $event.detail
        let photoIndex = 0
        for(const $photo of this.views.photosView.selectors.photo) {
          if(photoIndex === currentIndex) {
            $photo.setAttribute('data-active', true)
          } else if($photo.hasAttribute('data-active')) {
            $photo.removeAttribute('data-active')
          }
          photoIndex++
        }
      },
      'routers.fetch.photosRouter.routes.photos status': async function photosStatus($event) {
        const photos = await $event.detail.json()
        this.models.photosModel.content.push(...photos)
      },
    },
  }, { enableEvents: true })
  photosControl.models.photosModel.content.defineProperties({
    '_currentIndex': {
      enumerable: false,
      writable: true,
      value: 0,
    },
    'currentIndex': {
      enumerable: false,
      get() { return this._currentIndex },
      set($crement) {
        const photosModel = photosControl.models.photosModel
        let { currentIndex } = photosModel.content
        if(currentIndex + $crement >= photosModel.content.length) {
          currentIndex = 0
        } else if(currentIndex + $crement <= -1) {
          currentIndex = photosModel.content.length - 1
        } else {
          currentIndex += $crement
        }
        this._currentIndex = currentIndex
        photosModel.content.dispatchEvent(new CustomEvent('setCurrentIndex', {
          detail: { currentIndex },
        }))
      },
    },
  })
  photosControl.routers.fetch.photosRouter.routes.photos.get()
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)
