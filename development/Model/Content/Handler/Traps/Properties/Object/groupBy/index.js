export default function GroupBy($content, $options) {
  const { root } = $content
  return function groupBy() {
    return Object.groupBy(root, ...arguments)
  }
}