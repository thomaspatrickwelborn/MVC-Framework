const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
}
const Objects = {
  'object': Object,
  'array': Array
}
const Types = Object.assign({}, Primitives, Objects)
export {
  Primitives, Objects, Types
}
