import { ContentEvent } from '../../../../../Events/index.js'
export default function Delete(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const resolve = root.delete($key)
        $eventTarget.dispatchEvent(
          new ContentEvent(
            'delete',
            {
              basename,
              path,
              detail: {
                key: $key,
              }
            },
            $eventTarget
          )
        )
        $eventTarget.dispatchEvent(
          new ContentEvent(
            'deleteKey',
            {
              basename,
              path,
              detail: {
                key: $key,
              }
            },
            $eventTarget
          )
        )
        return resolve
      },
    }
  )
}
