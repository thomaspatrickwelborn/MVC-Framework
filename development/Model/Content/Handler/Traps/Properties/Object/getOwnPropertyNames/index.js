export default function GetOwnPropertyNames($content, $options) {
  const { root } = $content
  return function getOwnPropertyNames() {
    return Object.getOwnPropertyNames(root)
  }
}