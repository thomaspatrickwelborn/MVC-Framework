import View from '../view/index.js'
export default class PandTree extends View {
  #_model
  #_collect
  constructor($settings) {
    super({
      // templates
      parent: $settings.parent,
      templates: {
        default: function PandTreeTemplate($model) { return `
          <${$model.type}
            class="pand-tree"
            data-pass="${$model.pass}"
          >
            <pass
              data-pass="${$model.pass}"
            ></pass>
            <id>${$model.id}</id>
            <name>${$model.name}</name>
            <${$model.collectName}></${$model.collectName}>
          </${$model.type}>
        ` },
      },
      querySelectors: { querySelector: {
        pandTree: `:scope > ${$settings.model.type}`,
        pass: `:scope > ${$settings.model.type} > pass`,
        id: `:scope > ${$settings.model.type} > id`,
        name: `:scope > ${$settings.model.type} > name`,
        [$settings.model.collectName]: `:scope > ${$settings.model.type} > ${$settings.model.collectName}`
      } },
      events: {
        'pass click': function passClick($event) {
          console.log($event.type)
        },
        'id click': function idClick($event) {
          console.log($event.type)
        },
        'name click': function nameClick($event) {
          console.log($event.type)
        },
      },
      model: $settings.model,
    })
  }
  get model() {
    if(this.#_model !== undefined) return this.#_model
    this.#_model = this.settings.model
    return this.#_model
  }
  get collectName() { return this.model.collectName }
  get collect() {
    if(this.#_collect !== undefined) return this.#_collect
    const collect = []
    for(const [
      $collectItemName, $collectItem
    ] of this.model.collect) {
      let collectItem
      if(this.model.type === 'test-result') {
        collectItem = $collectItem
      }
      else {
        collectItem = new PandTree({
          parent: this.querySelectors[this.collectName],
          model: $collectItem,
        })
      }
      collect.push(collectItem)
    }
    this.#_collect = collect
    return this.#_collect
  }
  render() {
    this.template.innerHTML = this.templates.default(this.model)
    this.element = this.template.content
    this.renderCollect()
    console.log(this)
    return this
  }
  renderCollect() {
    for(const $collectItem of this.collect) {
      if(typeof $collectItem === 'object') {
        $collectItem.render()
      }
      else {
        this.querySelectors[this.collectName].append($collectItem)
      }
    }
    return this
  }
}