export default function Values($content, $options) {
  const { root } = $content
  return function values() {
    return Array.prototype.values.call(root)
  }
}