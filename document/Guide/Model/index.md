# Model Guide
**MVC Framework \| Guide \| *Model***  

## Model Instantiation
```
const $schemaSettings = { aaa: { type: String } }
const $schemaOptions = { validationType: 'primitive' }
const $contentSettings = { aaa: "AAA" }
const $contentOptions = { enableValidation: true }
const $localStorageOption = "/"
const $schema = new Schema($schemaSettings, $schemaOptions)
const $content = new Content($contentSettings, $contentOptions)
```
### Schema/Content Object Instantiation
```
import { Model } from '/dependencies/mvc-framework.js'

const model = new Model({
  schema: $schemaSettings,
  content: $contentSettings,
}, {
  schema: $schemaOptions,
  content: $contentOptions,
  localStorage: $localStorageOption,
})
```

### Schema/Content Class Instance Instantiation
```
import { Model, Schema, Content } from '/dependencies/mvc-framework.js'
const model = new Model({
  schema: $schema, content: $content
}, { localStorage: $localStorageOption })
```

## Model Content Ventilation
```
const $listener = function listener($event) {
  console.log($event.type, $event)
}
const $events = {
  'content setProperty': $listener,
  'content validateProperty': $listener,
}
```
### Default Events
```
const model = new Model({
  schema: $schema, content: $content, events: $events,
})
```