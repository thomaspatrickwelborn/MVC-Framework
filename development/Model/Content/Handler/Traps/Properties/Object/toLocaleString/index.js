export default function ToLocaleString($content, $options) {
  const { root } = $content
  return {
    get toLocalString() {
      return root['toLocaleString'](...arguments)
    },
    set toLocalString($method) {
      root[$method] = $method
    },
  }
}