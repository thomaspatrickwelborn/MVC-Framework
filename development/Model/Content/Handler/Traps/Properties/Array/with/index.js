export default function With($content, $options) {
  const { root } = $content
  const functionProperty = { with: function() {
    return Array.prototype.with.call(root, ...arguments)
  } }
  return functionProperty.with
}