export default function Flat($content, $options) {
  const { root } = $content
  return function flat() {
    return Array.prototype.flat.call(root, ...arguments)
  }
}