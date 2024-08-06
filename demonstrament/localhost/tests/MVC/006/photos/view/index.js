import { StaticView } from '/mvc-framework.js'
export default class PhotosView extends StaticView {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      element: document.querySelector('app'),
      selectors: {
        photosControl: 'photos-control',
        photosControlButton: 'photos-control > button',
        photos: 'photos',
        photo: 'photos > photo',
      },
    }), Object.assign($options, {
      enableSelectors: true,
      enableEvents: true,
    }))
  }
}