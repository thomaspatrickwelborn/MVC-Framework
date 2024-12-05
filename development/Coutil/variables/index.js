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
const TypeKeys = Object.keys(Types)
const TypeValues = Object.values(Types)
const TypeMethods = [
 Primitives.String, Primitives.Number, Primitives.Boolean, 
 Objects.Object, Objects.Array
]
export {
  Primitives, Objects, Types, TypeKeys, TypeValues, TypeMethods
}
