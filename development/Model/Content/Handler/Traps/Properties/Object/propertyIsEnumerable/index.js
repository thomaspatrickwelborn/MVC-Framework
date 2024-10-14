export default function PropertyIsEnumerable($content, $options) {
  const { root } = $content
  return function propertyIsEnumerable() {
    return Object.propertyIsEnumerable(root, ...arguments)
  }
}