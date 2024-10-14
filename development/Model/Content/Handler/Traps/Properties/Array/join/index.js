export default function Join($content, $options) {
  const { root } = $content
  return function join() {
    return Array.prototype.join.call(root)
  }
}