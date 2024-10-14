export default function PreventExtensions($content, $options) {
  const { root } = $content
  return function preventExtensions() {
    return Object.preventExtensions(root)
  }
}