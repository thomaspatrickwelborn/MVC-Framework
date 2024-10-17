# MVC Framework—View Class

## View Class Properties
### `parent` Property
**Type**: `getter`  
**Return**: `HTMLElement`  
**Descript**:  
### `template` Property
**Type**: `getter`  
**Return**: `HTMLTemplateElement`  
**Descript**:  
### `querySelectors` Property
**Type**: `getter`  
**Return**: `Object`  
**Descript**:  
### `qs` Property
**Type**: `getter`  
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
### Extended View Class
```
import { Model, View } from 'mvc-framework'
class ColorControlView extends View {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      templates: { default: ($content) => {
        return `<nav
          class="color-control"
          data-brightness="${$content.brightness}"
        >
          <button class="brightness">Toggle Brightness</button>
        </nav>`
      } },
      querySelectors: {
        querySelector: {
          colorControl: ':scope > .color-control',
          brightness: ':scope > .color-control > .brightness',
        }
      },
      events: {
          'qs.brightness click': ($event) => {
            const brightness = (content.get("brightness") === "MAX")
              ? "MIN" : "MAX"
            content.set("brightness", brightness)
          }
        },
    }), Object.assign($options, {}))
  }
  set brightness($brightness) {
    this.qs.colorControl.setAttribute(
      'data-brightness', $brighness
    )
  }
}
```
### Instantiate Extended View Class
```
// Model
const { content } = new Model({
  schema: {
    "brightness": {
      type: String,
      enum: ["MIN", "MAX"]
    }
  },
  content: {
    "brightness": "MIN"
  },
  events: {
    'content setProperty': ($event) => {
      const { key, value } = $event.detail
      if(key === 'brightness') { view.brightness = $value }
    }
  },
})
// Color Control View
const colorControlView = new ColorControlView({
  parent: document.querySelector('body')
})

colorControlView.render('default', content.object)
```