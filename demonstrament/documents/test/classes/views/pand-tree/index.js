import View from '../../core/view/index.js'
export default class PandTreeView extends View {
  #_models = {
    data: undefined,
    face: undefined,
  }
  #_collect
  constructor($settings) {
    super({
      parentElement: $settings.parentElement,
      templates: {
        testResultsNavigation: function TestResultsNavigationTemplate($models) {
          const $data = $models.data
          return ''
        },
        default: function PandTreeTemplate($models) {
          const $data = $models.data
          const $face = $models.face
          return `
            <${$data.get('type')}
              class="pand-tree"
              data-pand="${$face.get('pand')}"
              data-pass="${$data.get('pass')}"
            >
              <pass
                data-pass="${$data.get('pass')}"
              ></pass>
              <id>${$data.get('id')}</id>
              <name>${$data.get('name')}</name>
              <${$data.get('collectName')}></${$data.get('collectName')}>
            </${$data.get('type')}>
          `
        },
      },
      querySelectors: { querySelector: {
        pandTree: `:scope > ${$settings.models.data.get('type')}`,
        collect: `:scope > ${$settings.models.data.get('type')} > ${$settings.models.data.get('collectName')}`,
        pass: `:scope > ${$settings.models.data.get('type')} > pass`,
        id: `:scope > ${$settings.models.data.get('type')} > id`,
        name: `:scope > ${$settings.models.data.get('type')} > name`,
        [$settings.models.data.get('collectName')]: `:scope > ${$settings.models.data.get('type')} > ${$settings.models.data.get('collectName')}`,
      } },
      events: {},
      // events: {
      //   'pass click': function passClick($event) {},
      //   'id click': function idClick($event) { this.togglePand() },
      //   'name click': function nameClick($event) { this.togglePand() },
      // },
      models: $settings.models,
    })
    this.addEventListener('render', ($event) => {
      const { location, path, content } = this.models.data
      const { result, detail } = content
      let header = []
      header.length = path.length
      header = header.fill('-').join('')
      const log = [
        "\n", header,
        "\n", path,
        "\n", JSON.stringify(result),
      ]
      if(detail !== undefined) log.push(
        "\n", "detail", detail,
      )
      console.log(...log)
      this.renderCollect()
    })
  }
  togglePand() {
    const preterpand = this.querySelectors.pandTree.getAttribute('data-pand')
    const anterpand = (preterpand === 'ex') ? 'im' : 'ex'
    this.models.face.set('pand', anterpand)
    this.querySelectors.pandTree.setAttribute('data-pand', this.models.face.get('pand'))
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
  get collectName() { return this.models.data.get('collectName') }
  get collect() {
    if(this.#_collect !== undefined) return this.#_collect
    const collect = []
    for(const [
      $collectItemName, $collectItem
    ] of this.models.data.get('collect').entries()) {
      let collectFaceItem = this.models.face.get('collect').get($collectItemName)
      let collectItem
      if(this.models.data.get('type') === 'test-result') {
        collectItem = $collectItem
      }
      else {
        const collectName = this.models.data.get('collectName')
        collectItem = new PandTreeView({
          parentElement: this.querySelectors[collectName],
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
        const collectName = this.models.data.get('collectName')
        this.querySelectors[collectName]?.insertAdjacentHTML('beforeEnd', $collectItem)
      }
    }
    return this
  }
}