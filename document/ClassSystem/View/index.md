# MVC Framework—View Class

## View Class Properties
### `parent` Property
**Type**: `get`  
**Return**: `HTMLElement`  
**Descript**:  
### `template` Property
**Type**: `get`  
**Return**: `HTMLTemplateElement`  
**Descript**:  
### `querySelectors` Property
**Type**: `get`  
**Return**: `Object`  
**Descript**:  
### `qs` Property
**Type**: `get`  
**Return**: `Object`  
**Descript**:  

## View Class Methods
### addQuerySelectors
**Type**: `function`  
**Return**: `View`  
**Descript**:  

### removeQuerySelectors
**Type**: `function`  
**Return**: `View`  
**Descript**:  

### enableQuerySelectors
**Type**: `function`  
**Return**: `View`  
**Descript**:  

### disableQuerySelectors
**Type**: `function`  
**Return**: `View`  
**Descript**:  

### render
**Type**: `function`  
**Return**: `View`  
**Descript**:  

## Instantiate View Class

## Extend View Class
### Extended View Class—"Model-View" Strategy
**Imports**:  
```
import { Model, View } from 'mvc-framework'
```
**Extended View Class**:  
```
class ColorControlView extends View {
  model = new Model({
    schema: {
      "brightnessLabel": { type: "String" },
      "brightness": {
        type: String,
        enum: ["MIN", "MAX"]
      }
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
        }
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
            brightnessButtonValue.textContent = brightnessButtonValue
          }
        }
      },
    })
    this.render(this.model.content.object, 'default')
    this.setStyles()
  }
  setStyles() {
    this.parent.style.position = "absolute"
    this.parent.style.display = "flex"
    this.parent.style.flexDirection = "column"
    this.parent.style.right = "0"
    this.parent.style.margin = "0 0.5em"
    this.parent.style.backgroundColor = "red"
    return this
  }
}
```
### Instantiate Extended View Class
```
const colorControlView = new ColorControlView()
document.querySelector('body')
.insertAdjacentElement('afterbegin', view.parent)
```