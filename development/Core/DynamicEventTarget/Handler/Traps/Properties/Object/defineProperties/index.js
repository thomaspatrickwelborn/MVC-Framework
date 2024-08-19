import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperties(
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
  function defineProperties($event) {
    const definePropertiesEventData = {
      descriptors: $event.detail.descriptors,
      path: $event.path,
      basename: $event.basename,
    }
    $trap.createEvent(
      $eventTarget,
      'defineProperties',
      definePropertiesEventData,
      $root,
    )
  }
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0]
        // Iterate Property Descriptors
        iteratePropertyDescriptors: 
        for(const [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          // Property Descriptor Value Is Direct Instance Of Array/Object/Map
          if(isDirectInstanceOf(
            $propertyDescriptor.value, [Object, Array/*, Map*/]
          )) {
            const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
              $root, $propertyKey
            ) || {}
            // Root Property Descriptor Value Is Existent DET Instance
            if(
              descriptorValueMerge === true &&
              rootPropertyDescriptor.value // instanceof DynamicEventTarget
              ?.constructor.name === 'bound DynamicEventTarget'
            ) {
              rootPropertyDescriptor.value.removeEventListener(
                'defineProperties',
                defineProperties
              )
              rootPropertyDescriptor.value.removeEventListener(
                'defineProperty',
                defineProperty
              )
              rootPropertyDescriptor.value.addEventListener(
                'defineProperties',
                defineProperties
              )
              rootPropertyDescriptor.value.addEventListener(
                'defineProperty',
                defineProperty
              )
              // Root Define Properties, Descriptor Tree
              if(descriptorTree === true) {
                $root[$propertyKey].defineProperties($propertyDescriptor.value)
              } else
              // Root Define Properties, No Descriptor Tree
              {
                Object.defineProperties(
                  $root, {
                    [$propertyKey]: $propertyDescriptor
                  }
                )
              }
              
            }
            // Root Property Descriptor Value Is Non-Existent DET Instance
            else {
              const basename = $propertyKey
              const path = (
                $path !== null
              ) ? $path.concat('.', $propertyKey)
                : $propertyKey
              const root = (
                typeOf(
                  $propertyDescriptor.value
                ) === 'object'
              ) ? {}
                : (
                typeOf(
                  $propertyDescriptor.value
                ) === 'array'
              ) ? []
              //   : typeOf(
              //   $propertyDescriptor.value
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
              detObject.addEventListener(
                'defineProperties',
                defineProperties
              )
              // Root Define Properties, Descriptor Tree
              if(descriptorTree === true) {
                detObject.defineProperties($propertyDescriptor.value)
                $propertyDescriptor.value = detObject
                Object.defineProperties($root, {
                  [$propertyKey]: $propertyDescriptor
                })
              } else
              // Root Define Properties, No Descriptor Tree
              {
                Object.defineProperties($root, {
                  [$propertyKey]: $propertyDescriptor
                })
              }
            }
          } else 
          // Root Property Descriptor Value Is Not DET Instance
          {
            Object.defineProperties($root, {
              [$propertyKey]: $propertyDescriptor
            })
          }
          // Define Property Event Data
          const definePropertyEventData = {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
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
        }
        // Define Properties Event Data
        const definePropertiesEventData = {
          descriptors: $propertyDescriptors,
          path: $path,
          basename: $basename,
        }
        // Define Properties Event
        $trap.createEvent(
          $eventTarget,
          'defineProperties',
          definePropertiesEventData,
        )
        return $root
      }
    }
  )
}
