import { Control } from '/mvc-framework/index.js'
import PhotosModel from './model/index.js'
import PhotosView from './view/index.js'

export default class PhotosControl extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      views: { photosView: new PhotosView() },
      models: { photosModel: new PhotosModel() },
      events: {
        // A. Control Photos
        // A.1. Click Photos Control Button
        'views.photosView.selectors.photosControlButton click': function photosControlButtonClick($event) {
          const crement = Number($event.target.getAttribute('data-crement'))
          this.models.photosModel.currentIndex += crement
        },
        // A.2. Set Photos Model Current Index
        'models.photosModel.content assignSourceProperty:currentIndex': function setCurrentIndex($event) {
          const currentIndex = $event.detail.val
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
    this.models.photosModel.content.assign({
      length: this.views.photosView.selectors.photos.children.length
    })
    return this
  }
}
