import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  const { descriptorValueMerge, descriptorTree } = $options
  function defineProperty($event) {
    const definePropertyEventData = {
      prop: $event.detail.prop,
      descriptor: $event.detail.descriptor,
      path: $event.path,
      basename: $event.basename,
    }
    $trap.createEvent(
      $eventTarget,
      'defineProperty',
      definePropertyEventData,
      $root,
    )
  }
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const propertyKey = arguments[0]
        const propertyDescriptor = arguments[1]
        const propertyDescriptorClone = structuredClone(propertyDescriptor)
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
              'defineProperty',
              defineProperty
            )
            $root[propertyKey].addEventListener(
              'defineProperty',
              defineProperty
            )
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              $trap.defineProperty(propertyKey, propertyDescriptor)
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
              defineProperty
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
        // Define Property Event Data
        const definePropertyEventData = {
          prop: propertyKey,
          descriptor: propertyDescriptor,
          path: $path,
          basename: $basename,
        }
        // Define Property Event
        $trap.createEvent(
          $eventTarget,
          'defineProperty',
          definePropertyEventData,
          $root,
        )
        return $root
      }
    }
  )
}