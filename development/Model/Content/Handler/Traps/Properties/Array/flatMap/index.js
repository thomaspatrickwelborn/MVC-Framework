export default function FlatMap($content, $options) {
  const { root } = $content
  return function flatMap() {
    return Array.prototype.flatMap.call(root, ...arguments)
  }
}