export default function IndexOf($content, $options) {
  const { root } = $content
  return function indexOf() {
    return Array.prototype.indexOf.call(root, ...arguments)
  }
}