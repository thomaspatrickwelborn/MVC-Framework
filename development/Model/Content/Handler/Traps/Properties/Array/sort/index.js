export default function Sort($content, $options) {
  const { root } = $content
  return function sort() {
    return Array.prototype.sort.call(root, ...arguments)
  }
}