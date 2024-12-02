const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
  'undefined': undefined,
}
const Objects = {
  'object': Object,
  'array': Array,
  'null': null,
}
const Types = Object.assign({}, Primitives, Objects)
export {
  Primitives, Objects, Types
}
