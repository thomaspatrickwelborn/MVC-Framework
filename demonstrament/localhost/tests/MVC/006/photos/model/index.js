import { Model } from '/dependencies/mvc-framework.js'
export default class PhotosModel extends Model {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      content: {
        length: 0,
        currentIndex: 0,
      },
    }), $options)
  }
  get currentIndex() { return this.content.currentIndex }
  set currentIndex($currentIndex) {
    var currentIndex
    if($currentIndex >= this.content.length) {
      currentIndex = 0
    } else 
    if($currentIndex <= -1) {
      currentIndex = this.content.length - 1
    } else {
      currentIndex = $currentIndex
    }
    this.content.assign({ currentIndex })
  }
}