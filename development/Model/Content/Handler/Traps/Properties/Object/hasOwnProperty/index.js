export default function HasOwnProperty($content, $options) {
  const { root } = $content
  return function hasOwnProperty() {
    return Object.hasOwnProperty(root, ...arguments)
  }
}