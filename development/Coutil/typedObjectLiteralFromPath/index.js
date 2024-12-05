import * as path from '../path/index.js'
export default function typedObjectLiteralFromPath($path) {
  const subpaths = path.subpaths($path)
  let tree = (Number($path[0])) ?  [] : {}
  return tree
}