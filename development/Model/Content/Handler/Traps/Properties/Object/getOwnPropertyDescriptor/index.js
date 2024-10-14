export default function GetOwnPropertyDescriptor($content, $options) {
  const { root } = $content
  return function getOwnPropertyDescriptor() {
    return Object.getOwnPropertyDescriptor(root, ...arguments)
  }
}