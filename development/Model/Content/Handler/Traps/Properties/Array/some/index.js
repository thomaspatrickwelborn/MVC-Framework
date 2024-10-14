export default function Some($content, $options) {
  const { root } = $content
  return function some() {
    return Array.prototype.some.call(root, ...arguments)
  }
}