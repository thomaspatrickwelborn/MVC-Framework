import { Model } from '/mvc-framework/index.js'
export default class PhotosModel extends Model {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      content: [],
    }), $options)
    this.content.defineProperties({
      currentIndex: {
        enumerable: false,
        writable: true,
        value: 0,
      }
    })
  }
  get currentIndex() { return this.content.currentIndex }
  set currentIndex($currentIndex) {
    let currentIndex
    if($currentIndex >= this.content.length) {
      currentIndex = 0
    } else if(currentIndex <= -1) {
      currentIndex = this.content.length - 1
    } else {
      currentIndex = $currentIndex
    }
    this.content.assign({ currentIndex })
  }
}