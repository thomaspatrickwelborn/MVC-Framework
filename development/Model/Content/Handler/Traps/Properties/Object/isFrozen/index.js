export default function IsFrozen($content, $options) {
  const { root } = $content
  return function isfrozen() {
    return Object.isFrozen(root)
  }
}