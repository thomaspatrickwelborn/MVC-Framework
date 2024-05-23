import { Control } from '/mvc-framework/index.js'
import PhotosModel from './model/index.js'
import PhotosView from './view/index.js'
import PhotosRouter from './router/index.js'

export default class PhotosControl extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      views: { photosView: new PhotosView() },
      models: { photosModel: new PhotosModel() },
      routers: {
        fetch: { photosRouter: new PhotosRouter() },
      },
      events: {
        // A. Fetch Photos
        // A.1. Photos Router Status
        'routers.fetch.photosRouter.routes.photos status': async function photosStatus($event) {
          const photos = await $event.detail.json()
          this.models.photosModel.content.push(...photos)
        },
        // A.2. Push Photos Model
        'models.photosModel.content push': function photosPush($event) {
          this.views.photosView.renderElement({
            name: 'default', 
            data: this.models.photosModel.content,
          }, {
            enable: true,
          })
          this.enableEvents()
        },
        // A.3. Render Photos View
        'views.photosView render': function photosViewRender($event) {
          this.enableEvents()
          this.views.photosView.parentElement.replaceChildren(
            ...this.views.photosView.element.content.children
          )
        },
        // B. Control Photos
        // B.1. Click Photos Control Button
        'views.photosView.selectors.photosControlButton click': function photosControlButtonClick($event) {
          const crement = Number($event.target.getAttribute('data-crement'))
          this.models.photosModel.currentIndex += crement
        },
        // B.2. Set Photos Model Current Index
        'models.photosModel.content assignSourceProperty:currentIndex': function setCurrentIndex($event) {
          const currentIndex = $event.detail.val
          console.log('currentIndex', currentIndex)
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
      },
    }), Object.assign($options, { enableEvents: true }))
  }
  start() {
    this.routers.fetch.photosRouter.routes.photos.get()
  }
}
