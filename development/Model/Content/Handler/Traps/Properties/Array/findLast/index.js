export default function FindLast($content, $option) {
  const { root } = $content
  return function findLast() {
    return Array.prototype.findLast.call(root, ...arguments)
  }
}