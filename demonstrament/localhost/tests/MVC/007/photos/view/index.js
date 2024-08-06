import { DynamicView } from '/mvc-framework.js'
import * as Templates from './templates/index.js'
export default class PhotosView extends DynamicView {
  constructor($settings = {}, $options = {}) {
    super(Object.assign({
      type: 'dynamic',
      parentElement: document.querySelector('app'),
      selectors: {
        photosControl: 'photos-control',
        photosControlButton: 'photos-control > button',
        photos: 'photos',
        photo: 'photos > photo',
      },
      templates: {
        // Image Template
        img: Templates.img,
        // Photo Template
        photo: Templates.photo,
        // Photos Template
        photos: Templates.photos,
        // Photos Control Template
        photosControl: Templates.photosControl,
        // Default Template
        default: function defaultTemplate($photosContent) {
          return [
            this.templates.photosControl($photosContent),
            this.templates.photos($photosContent),
          ].join('\n')
        },
      },
      // 
    }, $settings), $options)
  }
}