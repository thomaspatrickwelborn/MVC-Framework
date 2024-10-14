export default function ToSpliced($content, $options) {
  const { root } = $content
  return function toSpliced() {
    return Array.prototype.toSpliced.call(root, ...arguments)
  }
}