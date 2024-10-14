export default function ToLocalString($content, $options) {
  const { root } = $content
  return function toLocalString() {
    return Array.prototype.toLocalString.call(root, ...arguments)
  }
}