export default function Is($content, $options) {
  const { root } = $content
  return function is() {
    return Object.is(root, ...arguments)
  }
}