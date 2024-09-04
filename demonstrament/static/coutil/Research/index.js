import Topic from './Topic/index.js'
export default class Research extends EventTarget {
  #settings
  #options
  #_type = "research"
  #_title
  #_topics
  constructor($settings = {}, $options = {}) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
  get type() { return this.#_type }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get topics() {
    if(this.#_topics !== undefined) return this.#_topics
    this.#_topics = []
    for(const $topic of this.#settings.topics) {
      new Topic()
    }
    return this.#_topics
  }
}