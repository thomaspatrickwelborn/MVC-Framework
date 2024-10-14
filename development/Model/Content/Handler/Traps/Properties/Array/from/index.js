export default function From($content, $options) {
  const { root } = $content
  return function from() {
    return Array.prototype.from.call(root, ...arguments)
  }
}