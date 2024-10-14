export default function Of($content, $options) {
  const { root } = $content
  return function() {
    return Array.prototype.of.call(root, ...Object.values(root))
  }
}