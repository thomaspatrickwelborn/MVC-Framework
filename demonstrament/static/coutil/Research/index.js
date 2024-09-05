import Topic from './Topic/index.js'
export default class Research extends EventTarget {
  #settings
  #options
  #_id
  #type = "research"
  #_title
  #_topics
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get topics() {
    if(this.#_topics !== undefined) return this.#_topics
    this.#_topics = []
    let topicIndex = 0
    for(const $topic of this.#settings.topics) {
      this.#_topics.push(
        new Topic(Object.assign($topic, { id: topicIndex }))
      )
      topicIndex++
    }
    return this.#_topics
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#settings.parent
    return this.#_parent
  }
}