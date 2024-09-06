import Topic from './Topic/index.js'
export default class Research extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_title
  #type = "research"
  #_topics
  constructor($model = {}, $view = {}) {
    super()
    this.#model = $model
    this.#view = $view
    this.render()
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#view.parent
    return this.#_parent
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    this.#_template.innerHTML = `<research>
      <h1>${this.title}</h1>
      <topics></topics>
    </research>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      research: this.parent.querySelector(':scope > research'),
      title: this.parent.querySelector(':scope > research > h1'),
      topics: this.parent.querySelector(':scope > research > topics'),
    }
    return this.#_querySelectors
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#model.title
    return this.#_title
  }
  get topics() {
    if(this.#_topics !== undefined) return this.#_topics
    this.#_topics = []
    let topicIndex = 0
    for(const $topic of this.#model.topics) {
      this.#_topics.push(
        new Topic(
          Object.assign($topic, { id: topicIndex }),
          { parent: this.querySelectors.topics }
        )
      )
      topicIndex++
    }
    return this.#_topics
  }
  render() {
    this.parent.appendChild(
      this.template.content
    )
    for(const $topic of this.topics) {
      $topic.render()
    }
    return this
  }
}