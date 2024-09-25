import {
  typeOf,
  isDirectInstanceOf,
} from '../../../../../../Coutil/index.js'
import Model from '../../../../../index.js'
import ModelEvent from '../../../../../ModelEvent/index.js'
export default function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { descriptorValueMerge, descriptorTree, events } = $options
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
        const propertyKey = arguments[0]
        const propertyDescriptor = arguments[1]
        // Property Descriptor Value Is Direct Instance Of Array/Object/Map
        if(isDirectInstanceOf(
          propertyDescriptor.value, [Object, Array/*, Map*/]
        )) {
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            root, propertyKey
          ) || {}
          // Descriptor Value Merge
          if(descriptorValueMerge === true) {
            // Root Property Descriptor Value Is Existent Model Instance
            if(
              rootPropertyDescriptor.value // instanceof Model
              ?.constructor.name === 'bound Model'
            ) {
              // Root Define Properties, Descriptor Tree
              if(descriptorTree === true) {
                rootPropertyDescriptor.value.defineProperties(
                  propertyDescriptor.value
                )
              } else
              // Root Define Properties, No Descriptor Tree
              {
                Object.defineProperty(
                  root, propertyKey, propertyDescriptor
                )
              }
            }
            // Root Property Descriptor Value Is Non-Existent Model Instance
            else {
              const _basename = propertyKey
              const _path = (
                path !== null
              ) ? path.concat('.', propertyKey)
                : propertyKey
              const _root = (
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
              const model = new Model(
                { content: _root }, {
                  basename: _basename,
                  parent: eventTarget,
                  path: _path,
                  rootAlias,
                }
              )
              // Root Define Properties, Descriptor Tree
              if(descriptorTree === true) {
                model.defineProperties(
                  propertyDescriptor.value
                )
                root[propertyKey] = model
              } else 
              // Root Define Properties, No Descriptor Tree
              if(descriptorTree === false) {
                Object.defineProperty(
                  root, propertyKey, propertyDescriptor
                )
              }
            }
          } else
          // No Descriptor Value Merge
          if(descriptorValueMerge === false) {
            const _basename = propertyKey
            const _path = (
              path !== null
            ) ? path.concat('.', propertyKey)
              : propertyKey
            const _root = (
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
            const model = new Model(
              { content: _root }, {
                basename: _basename,
                parent: eventTarget,
                path: _path,
                rootAlias,
              }
            )
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              model.defineProperties(
                propertyDescriptor.value
              )
              root[propertyKey] = model
            } else
            // Root Define Properties, No Descriptor Tree
            if(descriptorTree === false) {
              Object.defineProperty(
                root, propertyKey, propertyDescriptor
              )
            }
          }
        } else
        // Property Descriptor Value Not Array/Object/Map
        {
          Object.defineProperty(
            root, propertyKey, propertyDescriptor
          )
        }
        // Define Property Event
        if(events.includes('defineProperty')) {
          eventTarget.dispatchEvent(
            new ModelEvent(
              'defineProperty',
              {
                basename,
                path,
                detail: {
                  prop: propertyKey,
                  descriptor: propertyDescriptor,
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