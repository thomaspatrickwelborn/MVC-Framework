export default function LastIndexOf($content, $options) {
  const { root } = $content
  return function lastIndexOf() {
    return Array.prototype.lastIndexOf.call(root)
  }
}