import { FetchRouter, Model, View } from '/mvc-framework/index.js'

function DOMContentLoaded() {
  // Photos View
  const photosView = new View({
    parentElement: document.querySelector('app'),
    selectors: {
      photosControl: 'photos-control',
      photosControlButton: 'photos-control > button',
      photos: 'photos',
      photo: 'photos > photo',
    },
    events: {
      'render': function photosViewRender($event) {
        this.parentElement.replaceChildren(
          ...this.element.content.children
        )
      },
      'selectors.photosControlButton click': function photosControlButtonClick($event) {
        const crement = Number($event.target.getAttribute('data-crement'))
        photosModel.content.assign({ currentIndex: crement })
      },
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
  }, { enable: true })
  const photosModel = new Model({
    content: [],
    events: {
      'content push': function photosPush($event) {
        photosView.renderElement({
          name: 'default', 
          data: photosModel.content,
        })
      },
      'setCurrentIndex': function setCurrentIndex($event) {
        const { currentIndex } = $event.detail
        let photoIndex = 0
        for(const $photo of photosView.selectors.photo) {
          if(photoIndex === currentIndex) {
            $photo.setAttribute('data-active', true)
          } else if($photo.hasAttribute('data-active')) {
            $photo.removeAttribute('data-active')
          }
          photoIndex++
        }
      },
    },
  })
  photosModel.content.defineProperties({
    '_currentIndex': {
      enumerable: false,
      writable: true,
      value: 0,
    },
    'currentIndex': {
      enumerable: false,
      get() { return this._currentIndex },
      set($crement) {
        let { currentIndex } = photosModel.content
        if(currentIndex + $crement >= photosModel.content.length) {
          currentIndex = 0
        } else if(currentIndex + $crement <= -1) {
          currentIndex = photosModel.content.length - 1
        } else {
          currentIndex += $crement
        }
        this._currentIndex = currentIndex
        photosModel.dispatchEvent(new CustomEvent('setCurrentIndex', {
          detail: { currentIndex },
        }))
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
      },
    },
  }, { enableEvents: true })
  fetchRouter.routes.photos.get()
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)

// /graphics/photos