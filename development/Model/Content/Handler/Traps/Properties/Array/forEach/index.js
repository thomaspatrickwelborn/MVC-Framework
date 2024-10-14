export default function ForEach($content, $options) {
  const { root } = $content
  return function forEach() {
    return Array.prototype.forEach.call(root, ...arguments)
  }
}