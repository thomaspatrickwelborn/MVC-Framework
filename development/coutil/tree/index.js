import { Coutil } from 'core-plex'
import * as path from '../path/index.js'
const { regularExpressions, typedObjectLiteral } = Coutil
function get($path, $value) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  const key = subpaths.pop()
  const tree = $value
  let treeNode = tree
  for(const $subpath of subpaths) {
    treeNode = treeNode[$subpath]
  }
  return treeNode[key]
}
function set($path, $value) {
  const {
    keypaths, key, typeofRoot
  } = path.parse($path)
  const tree = typedObjectLiteral(typeofRoot)
  let treeNode = tree
  for(const $subpath of keypaths) {
    if(Number($subpath)) { treeNode[$subpath] = [] }
    else { treeNode[$subpath] = {} }
    treeNode = treeNode[$subpath]
  }
  treeNode[key] = $value
  return tree
}
export { get, set }