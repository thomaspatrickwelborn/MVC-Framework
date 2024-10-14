export default function GetOwnPropertyDescriptors($content, $options) {
  const { root } = $content
  return function getOwnPropertyDescriptors() {
    return Object.getOwnPropertyDescriptors(root)
  }
}