import * as Variables from '../variables/index.js'
import * as Path from '../path/index.js'
import * as Tree from '../tree/index.js'
import typedObjectLiteral from "../typedObjectLiteral/index.js"
function impandTree($root, $tree) {
  const typeofTree = typeof $tree
  const typeofRoot = typeof $root
  if(
    !['string', 'function'].includes(typeofTree) ||
    typeofRoot && typeofRoot !== 'object'
  ) { return undefined /*$root*/ }
  let tree = typedObjectLiteral($root)
  if(typeofRoot === 'object') {
    iterateRootEntries: 
    for(const [$rootKey, $rootValue] of Object.entries($root)) {
      if(typeofTree === 'string') { tree[$rootKey] = Tree.get($tree, $rootValue) }
      else if(typeofTree === 'function') { tree = $tree($rootValue) }
    }
  }
  return tree
}

function expandTree($root, $tree) {
  const typeofTree = typeof $tree
  const typeofRoot = typeof $root
  if(
    !['string', 'function'].includes(typeofTree) ||
    typeofRoot && typeofRoot !== 'object'
  ) { return undefined /*$root*/ }
  let tree
  if(typeofRoot === 'object') {
    iterateRootEntries: 
    for(const [$rootKey, $rootValue] of Object.entries($root)) {
      if(typeofTree === 'string') { tree = Tree.set($tree, $rootValue) }
      else if(typeofTree === 'function') { tree = $tree($rootValue) }
    }
  }
  return tree
}

export { impandTree, expandTree }

