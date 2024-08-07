import { Control } from '/dependencies/mvc-framework.js'
import PhotosEditor from '../photosEditor/index.js'

export default class Application extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign({
      views: {
        default: {
          type: 'static',
          element: document.querySelector('app'),
        },
      },
      controls: {
        photosEditor: new PhotosEditor()
      },
    }, $settings), Object.assign({}, $options))
  }
  start() {
    this.controls.photosEditor.start()
    this.views.default.element.replaceChildren(
      ...this.controls.photosEditor.views.default
      .element.content.children
    )
    return this
  }
}