import Topic from './Topic/index.js'
export default class Research extends EventTarget {
  #settings
  #type = "research"
  #_title
  #_topics
  #_parent
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    console.log(this)
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
        new Topic(
          Object.assign($topic, { id: topicIndex })
        )
      )
      topicIndex++
    }
    return this.#_topics
  }
}