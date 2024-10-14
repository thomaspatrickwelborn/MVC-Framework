export default function Keys($content, $options) {
  const { root } = $content
  return function keys() {
    return Object.keys(root)
  }
}