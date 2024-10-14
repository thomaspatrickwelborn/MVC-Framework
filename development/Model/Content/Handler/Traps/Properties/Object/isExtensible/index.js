export default function IsExtensible($content, $options) {
  const { root } = $content
  return function isExtensible() {
    return Object.isExtensible(root)
  }
}