import {
  Control, Model, DynamicView, FetchRouter
} from '/mvc-framework.js'
import PhotoEditor from './photoEditor/index.js'
import PhotoSelector from './photoSelector/index.js'

export default class PhotosEditor extends Control {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({
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
          // A. Photo Selector Control Events
          // A.1. Photo Selector Default View Render
          'controls.photoSelector.views.default render': 
          function photosSelectorDefaultViewRender($event) {
            if(this.views.default.selectors.photosEditor.children.length === 1) {
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
          // A.2.
          // Photo Selector Default Model Assign Source Property "ID"
          'controls.photoSelector.models.default.content assignSourceProperty:_id': 
          function photoSelectorControlDefaultModelAssignSourcePropertyID($event) {
            this.controls.photoEditor.models.default.content.assign({ _id: $event.detail.val })
          },
          // B. Photo Editor Control Events
          // B.1. Photo Editor Default View Render
          'controls.photoEditor.views.default render': 
          function photoEditorDefaultViewRender($event) {
            if(this.views.default.selectors.photosEditor.children.length === 2) {
              this.views.default.selectors.photosEditor.children[1].replaceWith(
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
      }, $settings),
      Object.assign({}, $options)
    )
  }
  start() {
    this.controls.photoEditor.start()
    this.controls.photoSelector.start()
    this.views.default.renderElement({
      templateName: 'default',
      content: {},
    })
      return this
  }
}