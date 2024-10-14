export default function ToSorted($content, $options) {
  const { root } = $content
  return function toSorted() {
    return Array.prototype.toSorted.call(root, ...arguments)
  }
}