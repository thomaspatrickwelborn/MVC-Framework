import typeOf from "../typeOf/index.js"
export default function typedObjectLiteral($object) {
  if(typeOf($object) === 'object') { return {} }
  else if(typeOf($object) === 'array') { return [] }
  else { return undefined }
}