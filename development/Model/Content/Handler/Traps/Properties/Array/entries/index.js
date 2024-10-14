export default function Entries($content, $options) {
  const { root } = $content
  return function entries() {
    return Array.prototype.entries.call(root)
  }
}