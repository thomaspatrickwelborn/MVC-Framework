export default function FindIndex($content, $options) {
  const { root } = $content
  return function findIndex() {
    return Array.prototype.findIndex.call(root, ...arguments)
  }
}