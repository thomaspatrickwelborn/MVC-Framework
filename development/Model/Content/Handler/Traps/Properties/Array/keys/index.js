export default function Keys($content, $options) {
  const { root } = $content
  return function keys() {
    return Array.prototype.keys.call(root)
  }
}