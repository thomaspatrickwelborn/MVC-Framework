export default function _Map($content, $options) {
  const { root } = $content
  return function map() {
    return Array.prototype.map.call(root, ...arguments)
  }
}