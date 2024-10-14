export default function ValueOf($content, $options) {
  const { root } = $content
  return {
    get valueOf() {
      return root['valueOf'](...arguments)
    },
    set valueOf($method) {
      root[$method] = $method
    },
  }
}