export default function Slice($content, $options) {
  const { root } = $content
  return function slice() {
    return Array.prototype.slice.call(root, ...arguments)
  }
}