import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Reverse(
  $trap, $trapPropertyName, $aliases
) {
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        Array.prototype.reverse.call(root, ...arguments)
        eventTarget.dispatchEvent(
          new DETEvent(
            'reverse',
            {
              basename,
              path,
              detail: {
                reference: root
              },
            },
            eventTarget
          )
        )
        return root
      }
    }
  )
}