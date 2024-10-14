export default function Find($content, $options) {
  const { root } = $content
  return function find() {
    return Array.prototype.find.call(root, ...arguments)
  }
}