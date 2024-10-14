export default function IsPrototypeOf($content, $options) {
  const { root } = $content
  return function isPrototypeOf() {
    return Object.isPrototypeOf(root, ...arguments)
  }
}