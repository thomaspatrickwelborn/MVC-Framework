import Control from '/coutil/Control/index.js'
import Topic from './Topic/index.js'
export default class Research extends Control {
  #_title
  #type = "research"
  #_topics
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      parent: document.querySelector('mvc-framework'),
      template: ($content) => `
        <research>
          <h1>${$content.title}</h1>
          <topics></topics>
        </research>
      `,
      querySelectors: {
        research: ':scope > research',
        title: ':scope > research > h1',
        topics: ':scope > research > topics',
      },
    }))
    this.render()
    this.topics
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.model.title
    return this.#_title
  }
  get topics() {
    if(this.#_topics !== undefined) return this.#_topics
    this.#_topics = []
    let topicIndex = 0
    for(const $topic of this.model.topics) {
      const topic = new Topic(
        Object.assign($topic, { id: topicIndex }),
        { parent: this.querySelectors.topics }
      )
      this.#_topics.push(topic)
      topicIndex++
    }
    return this.#_topics
  }
}