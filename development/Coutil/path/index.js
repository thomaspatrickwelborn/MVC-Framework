import regularExpressions from '../regularExpressions/index.js'
function subpaths($path) {
  return $path.split(new RegExp(regularExpressions.quotationEscape))
}
function key($path) {
  return subpaths($path).pop()
}
function root($path) {
  return subpaths($path).shift()
}
function typeofRoot($path) {
  return (Number(root($path))) ? 'array' : 'object'
}
function parse($path) {
  return {
    subpaths: subpaths($path),
    key: key($path),
    root: root($path),
    typeofRoot: typeofRoot($path),
  }
}
export {
  subpaths, key, root, typeofRoot, parse
}