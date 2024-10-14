export default function Includes($content, $options) {
  const { root } = $content
  return function includes() {
    return Array.prototype.includes.call(root, ...arguments)
  }
}