export default function HasOwn($content, $options) {
  const { root } = $content
  return {
    get() {
      return Object.hasOwn(root, ...arguments)
    },
    set($method) {
      root[$method] = $method
    },
  }
}