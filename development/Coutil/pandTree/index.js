import typedObjectLiteral from "../typedObjectLiteral/index.js"
function impandTree($tree, $retainKey) {
  let tree = typedObjectLiteral($tree)
  for(const [$treeKey, $treeNode] of Object.entries($tree)) {
    const retainValue = $treeNode[$retainKey]
    if(retainValue && typeof retainValue === 'object') {
      tree[$treeKey] = impandTree(retainValue, $retainKey)
    }
    else {
      tree[$treeKey] = retainValue
    }
  }
  return tree
}

function expandTree($tree = {}, $retainKey, $altKeys = {}) {
  if($retainKey === undefined) return undefined
  let tree = typedObjectLiteral($tree)
  for(const [$treeKey, $treeNode] of Object.entries($tree)) {
    const retainValue = $treeNode
    if(retainValue && typeof retainValue === 'object') {
      tree[$treeKey] = Object.assign({
        [$retainKey]: expandTree(retainValue, $retainKey, $altKeys)
      }, $altKeys)
    }
    else {
      tree[$treeKey] = Object.assign({
        [$retainKey]: retainValue
      }, $altKeys)
    }
  }
  return tree
}

export { impandTree, expandTree }

