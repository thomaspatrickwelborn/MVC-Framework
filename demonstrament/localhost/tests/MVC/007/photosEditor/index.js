import {
  Control, Model, DynamicView, FetchRouter
} from '/mvc-framework/index.js'
import PhotoEditor from './photoEditor/index.js'
import PhotoSelector from './photoSelector/index.js'

export default class PhotosEditor extends Control {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign($settings, {
        views: {
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
        events: {
          'controls.photoSelector.views.default render': function photosSelectorDefaultViewRender($event) {
            if(this.views.default.selectors.photosEditor.children.length > 0) {
              this.views.default.selectors.photosEditor.children[0].replaceWith(
                this.controls.photoSelector.views.default.element.content.children[0]
              )
            } else {
              this.views.default.selectors.photosEditor.prepend(
                ...this.controls.photoSelector.views.default
                .element.content.children
              )
            }
          },
          'controls.photoEditor.views.default render': function photoEditorDefaultViewRender($event) {
            if(this.views.default.selectors.photosEditor.children.length > 0) {
              this.views.default.selectors.photosEditor.children[0].replaceWith(
                this.controls.photoEditor.views.default.element.content.children[0]
              )
            } else {
              this.views.default.selectors.photosEditor.append(
                ...this.controls.photoEditor.views.default
                .element.content.children
              )
            }
          },
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
    return this
  }
}