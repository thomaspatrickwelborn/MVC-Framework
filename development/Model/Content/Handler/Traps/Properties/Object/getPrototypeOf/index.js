export default function GetPrototypeOf($content, $options) {
  const { root } = $content
  return function getPrototypeOf() {
    return Object.getPrototypeOf(root)
  }
}