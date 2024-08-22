import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
export default function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { descriptorValueMerge, descriptorTree } = $options
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const propertyKey = arguments[0]
        const propertyDescriptor = arguments[1]
        // Property Descriptor Value Is Direct Instance Of Array/Object/Map
        if(isDirectInstanceOf(
          propertyDescriptor.value, [Object, Array/*, Map*/]
        )) {
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            $root, propertyKey
          ) || {}
          // Root Property Descriptor Value Is Existent DET Instance
          if(
            descriptorValueMerge === true &&
            rootPropertyDescriptor.value // instanceof DynamicEventTarget
            ?.constructor.name === 'bound DynamicEventTarget'
          ) {
            $root[propertyKey].removeEventListener(
              'defineProperty', DynamicEventBubble
            )
            $root[propertyKey].addEventListener(
              'defineProperty', DynamicEventBubble
            )
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              rootPropertyDescriptor.value.defineProperties(
                propertyDescriptor.value
              )
            } else
            // Root Define Properties, No Descriptor Tree
            {
              Object.defineProperty(
                $root, propertyKey, propertyDescriptor
              )
            }
          }
          // Root Property Descriptor Value Is Non-Existent DET Instance
          else {
            const basename = propertyKey
            const path = (
              $path !== null
            ) ? $path.concat('.', propertyKey)
              : propertyKey
            const root = (
              typeOf(
                propertyDescriptor.value
              ) === 'object'
            ) ? {}
              : (
              typeOf(
                propertyDescriptor.value
              ) === 'array'
            ) ? []
            //   : typeOf(
            //   propertyDescriptor.value
            // ) === 'map'
            //   ? new Map()
              : {}
            const detObject = new DynamicEventTarget(
              root, {
                $rootAlias,
                $path: path,
                $basename: basename,
                $parent: $eventTarget,
              }
            )
            detObject.addEventListener(
              'defineProperty',
              DynamicEventBubble
            )
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              detObject.defineProperties(
                propertyDescriptor.value
              )
              $root[propertyKey] = detObject
            } else {
              Object.defineProperty(
                $root, propertyKey, propertyDescriptor
              )
            }
          }
        } else {
          Object.defineProperty(
            $root, propertyKey, propertyDescriptor
          )
        }
        // Define Property Event
        $eventTarget.dispatchEvent(
          new DynamicEvent(
            'defineProperty',
            {
              basename: $basename,
              path: $path,
              detail: {
                prop: propertyKey,
                descriptor: propertyDescriptor,
              },
            }
          )
        )
        return $root
      }
    }
  )
}