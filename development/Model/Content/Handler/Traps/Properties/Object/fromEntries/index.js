export default function FromEntries($content, $options) {
  const { root } = $content
  return function fromEntries() {
    return Object.entries(root)
  }
}