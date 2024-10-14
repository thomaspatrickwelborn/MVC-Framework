export default function ToString($content, $options) {
  const { root } = $content
  return function toString() {
    return Array.prototype.toString.call(root, ...arguments)
  }
}