export default function IsSealed($content, $options) {
  const { root } = $content
  return function isSealed() {
    return Object.isSealed(root)
  }
}