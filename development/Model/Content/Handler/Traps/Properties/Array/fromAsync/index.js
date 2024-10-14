export default function FromAsync($content, $options) {
  const { root } = $content
  return function fromAsync() {
    return Array.prototype.fromAsync.call(root, ...arguments)
  }
}