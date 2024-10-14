export default function At($content, $options) {
  const { root } = $content
  return function at() {
    return Array.prototype.at.call(root, ...arguments)
  }
}