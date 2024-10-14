export default function ToReversed($content, $options) {
  const { root } = $content
  return function toReversed() {
    return Array.prototype.toReversed.call(root, ...arguments)
  }
}