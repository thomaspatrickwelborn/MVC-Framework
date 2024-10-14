export default function Reduce($content, $options) {
  const { root } = $content
  return function reduce() {
    return Array.prototype.reduce.call(root, ...arguments)
  }
}