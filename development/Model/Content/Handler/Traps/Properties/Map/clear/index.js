import ContentEvent from '../../../../../Event/index.js'
export default function Clear(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    root, 
    rootAlias, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const resolve = root.clear($key)
        $eventTarget.dispatchEvent(
          'clear',
          {},
        )
      },
    }
  )
}
