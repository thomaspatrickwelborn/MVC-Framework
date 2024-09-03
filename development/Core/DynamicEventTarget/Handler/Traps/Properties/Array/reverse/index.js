import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Reverse(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
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
        if(events.includes('reverse')) {
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
        }
        return root
      }
    }
  )
}