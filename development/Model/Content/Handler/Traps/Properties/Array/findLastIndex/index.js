export default function FindLastIndex($content, $options) {
  const { root } = $content
  return function findLastIndex() {
    return Array.prototype.findLastIndex.call(root, ...arguments)
  }
}