import { Model, View } from '/dependencies/mvc-framework.js'
class ColorControlView extends View {
  model = new Model({
    schema: {
      "brightnessLabel": { type: String },
      "brightness": { type: String, enum: ["MIN", "MAX"] },
    },
    content: {
      "brightnessLabel": "Brightness",
      "brightness": "MIN",
    },
  })
  constructor() {
    super({
      parent: document.createElement('color-control'),
      templates: { default: ($content) => {
        return `
          <buttons-label>Color-Control</buttons-label>
          <buttons
            data-brightness="${$content.brightness}"
          >
            <button
              data-key="brightness"
              data-value="${$content.brightness}"
            >
              <button-label>${$content.brightnessLabel}</button-label>
              <button-value>${$content.brightness}</button-value>
            </button>
          </buttons>`
      } },
      querySelectors: {
        querySelector: {
          buttons: ':scope > buttons',
          brightnessButton: ':scope > buttons > button[data-key="brightness"]',
          brightnessButtonValue: ':scope > buttons > button[data-key="brightness"] > button-value'
        },
      },
      events: {
        'qs.brightnessButton click': ($event) => {
          const { content } = this.model
          const brightness = (content.get("brightness") === "MAX")
            ? "MIN" : "MAX"
          content.set("brightness", brightness)
        },
        'model.content setProperty': ($event) => {
          const { key, value } = $event.detail
          if(key === 'brightness') {
            const { brightnessButton, brightnessButtonValue } = this.qs
            brightnessButton.setAttribute('data-value', value)
            brightnessButtonValue.textContent = value
          }
        }
      },
    })
    this.render(this.model.content.object, 'default')
  }
}
const colorControlView = new ColorControlView()
colorControlView.enableEvents()
colorControlView.model.content.addEventListener('setProperty', ($event) => {
  const { key, value } = $event.detail
  if(key === "brightness") {
    document.querySelector('body').setAttribute('data-brightness', value)
  }
})
document.querySelector('body > main').insertAdjacentElement('afterbegin', colorControlView.parent)

