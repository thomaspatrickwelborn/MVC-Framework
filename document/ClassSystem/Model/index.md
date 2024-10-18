# MVC Framework—Model Class
 - [Constructor Arguments](#constructor-arguments)
 - [Properties](#properties)
 - [Methods](#methods)
 - Instantiation Techniques
   - [Instantiation Technique #1—Schema/Content Object Literals](#instantiation-technique-1schemacontent-object-literals)
   - [Instantiation Technique #2—Schema/Content Instances](#instantiation-technique-2schemacontent-instances)
## Constructor Arguments
### `$settings` Argument
#### `schema` Setting
#### `content` Setting

### `$options` Argument
#### `schema` Option
#### `content` Option

## Properties
### `schema` Property
### `content` Property

## Methods
### `parse` Method

## Instantiation Technique #1—Schema/Content Object Literals
```
import { Model } from '/dependencies/mvc-framework.js'

const model = new Model({
  schema: { aaa: { type: String } },
  content: { aaa: "AAA" },
}, {
  localStorage: "/",
  schema: { validationType: 'primitive' },
  content: { enableValidation: true },
})
```

## Instantiation Technique #2—Schema/Content Instances
```
import { Model, Schema, Content } from '/dependencies/mvc-framework.js'
const model = new Model({
  schema: new Schema(
    { aaa: { type: String } },
    { validationType: 'primitive' },
  ),
  content: new Content(
    { aaa: "AAA" },
    { enableValidation: true },
  )
})
```