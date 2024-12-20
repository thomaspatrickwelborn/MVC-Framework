import View from '../../core/view/index.js'
export default class PandTreeView extends View {
  #_models = {
    data: undefined,
    face: undefined,
  }
  #_collect
  constructor($settings) {
    super({
      // templates
      parentElement: $settings.parentElement,
      templates: {
        default: function PandTreeTemplate($models) {
          const $data = $models.data
          const $face = $models.face
          return `
            <${$data.type}
              class="pand-tree"
              data-pand="${$face.pand}"
              data-pass="${$data.pass}"
            >
              <pass
                data-pass="${$data.pass}"
              ></pass>
              <id>${$data.id}</id>
              <name>${$data.name}</name>
              <${$data.collectName}></${$data.collectName}>
            </${$data.type}>
          `
        },
      },
      querySelectors: { querySelector: {
        pandTree: `:scope > ${$settings.models.data.type}`,
        collect: `:scope > ${$settings.models.data.type} > ${$settings.models.data.collectName}`,
        pass: `:scope > ${$settings.models.data.type} > pass`,
        id: `:scope > ${$settings.models.data.type} > id`,
        name: `:scope > ${$settings.models.data.type} > name`,
        [$settings.models.data.collectName]: `:scope > ${$settings.models.data.type} > ${$settings.models.data.collectName}`,
      } },
      events: {
        'pass click': function passClick($event) {
          console.log($event.type, $event.currentTarget.tagName)
        },
        'id click': function idClick($event) {
          this.togglePand()
        },
        'name click': function nameClick($event) {
          this.togglePand()
        },
      },
      models: $settings.models,
    })
    console.log("$settings", $settings)
    this.addEventListener('render', ($event) => { this.renderCollect() })
  }
  togglePand() {
    const preterpand = this.querySelectors.pandTree.getAttribute('data-pand')
    const anterpand = (preterpand === 'ex') ? 'im' : 'ex'
    this.models.face.pand = anterpand
    this.querySelectors.pandTree.setAttribute('data-pan', this.models.face.pand)
  }
  get models() {
    if(Object.values(this.#_models).every(
      ($model) => $model !== undefined)
    ) return this.#_models
    Object.entries(this.settings.models).forEach(
      ([$modelName, $model]) => this.#_models[$modelName] = $model
    )
    return this.#_models
  }
  get collectName() { return this.models.data.collectName }
  get collect() {
    if(this.#_collect !== undefined) return this.#_collect
    const collect = []
    for(const [
      $collectItemName, $collectItem
    ] of this.models.data.collect.entries()) {
      let collectFaceItem = this.models.face.collect.get($collectItemName)
      let collectItem
      if(this.models.data.type === 'test-result') {
        collectItem = $collectItem
      }
      else {
        collectItem = new PandTreeView({
        // collectItem = new this.Class({
          parentElement: this.querySelectors[this.collectName],
          models: {
            data: $collectItem, 
            face: collectFaceItem,
          },
        })
      }
      collect.push(collectItem)
    }
    this.#_collect = collect
    return this.#_collect
  }
  renderCollect() {
    this.#_collect = undefined
    const collect = this.collect
    for(const $collectItem of this.collect) {
      if(typeof $collectItem === 'object') {
        $collectItem.render($collectItem.models, 'default')
      }
      else {
        this.querySelectors[this.collectName]?.append($collectItem)
      }
    }
    return this
  }
}