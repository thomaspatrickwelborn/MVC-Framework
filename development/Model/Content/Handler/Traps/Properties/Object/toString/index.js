export default function ToString($content, $options) {
  const { root } = $content
  return {
    get toString() {
      return root['toString'](...arguments)
    },
    set toString($method) {
      root[$method] = $method
    },
  }
}