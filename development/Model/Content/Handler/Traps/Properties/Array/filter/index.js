export default function Filter($content, $options) {
  const { root } = $content
  return function filter() {
    return Array.prototype.filter.call(root, ...arguments)
  }
}