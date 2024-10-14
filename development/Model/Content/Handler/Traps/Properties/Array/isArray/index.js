export default function IsArray($content, $options) {
  const { root } = $content
  return function isArray() {
    return Array.prototype.isArray.call(root)
  }
}