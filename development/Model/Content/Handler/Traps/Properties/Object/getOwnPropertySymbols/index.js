export default function GetOwnPropertySymbols($content, $options) {
  const { root } = $content
  return function getOwnPropertySymbols() {
    return Object.getOwnPropertySymbols(root)
  }
}