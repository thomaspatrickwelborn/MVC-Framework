export default function Entries($content, $options) {
  const { root } = $content
  return function entries() {
    return Object.entries(root)
  }
}