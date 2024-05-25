import {
  Control, Model, DynamicView, FetchRouter
} from '/mvc-framework/index.js'
import PhotoEditor from './photoEditor/index.js'
import PhotoSelector from './photoSelector/index.js'

export default class PhotosEditor extends Control {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign($settings, {
        models: {
          default: {
            content: [],
          },
        },
        views: {
          // Photos Editor View
          default: {
            type: 'dynamic',
            templates: {
              default: ($content) => {
                return `<photos-editor></photos-editor>`
              }
            },
            selectors: {
              photosEditor: 'photos-editor'
            },
          }
        },
        controls: {
          photoEditor: new PhotoEditor(),
          photoSelector: new PhotoSelector(),
        },
      }),
      Object.assign($options, {})
    )
  }
  start() {
    this.controls.photoSelector.start()
    this.views.default.renderElement({
      templateName: 'default',
      content: {},
    })
    this.views.default.selectors.photosEditor.replaceChildren(
      ...this.controls.photoSelector.views.default
      .element.content.children
    )
    return this
  }
}