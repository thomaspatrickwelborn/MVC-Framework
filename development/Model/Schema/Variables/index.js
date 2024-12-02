const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
  'undefined': undefined,
  'null': null,
}
const Objects = {
  'object': Object,
  'array': Array,
}
const Types = Object.assign({}, Primitives, Objects)
export {
  Primitives, Objects, Types
}
