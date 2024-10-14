export default function Every($content) {
  const { root } = $content
  return function every() {
    return Array.prototype.every.call(root, ...arguments)
  }
}