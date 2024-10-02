import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import ContentEvent from '../../../../../Event/index.js'
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
    schema,
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        let valid, validateSourceProperty
        const { enableValidation } = schema.options
        const propertyKey = arguments[0]
        const propertyDescriptor = arguments[1]
        // Property Descriptor Value: Direct Instance Array/Object/Map
        if(isDirectInstanceOf(
          propertyDescriptor.value, [Object, Array/*, Map*/]
        )) {
          let subschema
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[propertyKey]; break
          }
          // Enable Validation, No Subschema: Iterate Source Props
          // if(enableValidation && !subschema) continue iterateSourceProps
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            root, propertyKey
          ) || {}
          // Root Property Descriptor Value: Existent DET Instance
          if(
            rootPropertyDescriptor.value // instanceof Content
            ?.constructor.name === 'bound Content'
          ) {
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              rootPropertyDescriptor.value.defineProperties(
                propertyDescriptor.value
              )
            }
            // Root Define Properties, No Descriptor Tree
            else {
              Object.defineProperty(root, propertyKey, propertyDescriptor)
            }
          }
          // Root Property Descriptor Value: Non-Existent DET Instance
          else {
            const _basename = propertyKey
            const _path = (
              path !== null
            ) ? path.concat('.', propertyKey)
              : propertyKey
            const _root = (typeOf(propertyDescriptor.value) === 'object')
              ? {}
              : (typeOf(propertyDescriptor.value) === 'array')
              ? []
            //   : (typeOf(propertyDescriptor.value) === 'map')
            //   ? new Map()
              : {}
            const contentObject = new Content(
              _root, {
                basename: _basename,
                parent: eventTarget,
                path: _path,
                rootAlias,
              }, subschema
            )
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              contentObject.defineProperties(propertyDescriptor.value)
              root[propertyKey] = contentObject
            } else 
            // Root Define Properties, No Descriptor Tree
            if(descriptorTree === false) {
              Object.defineProperty(root, propertyKey, propertyDescriptor)
            }
          }
        }
        // Property Descriptor Value Not Array/Object/Map
        else {
          validateSourceProperty = (enableValidation)
            ? schema.validateProperty(propertyKey, propertyDescriptor.value)
            : null
          valid = ((
            enableValidation && validateSourceProperty.valid
          ) || !enableValidation)
          if(valid) {
            Object.defineProperty(root, propertyKey, propertyDescriptor)
          }
        }
        // Define Property Event
        if(events.includes('defineProperty') && valid) {
          eventTarget.dispatchEvent(
            new ContentEvent('defineProperty', {
              basename,
              path,
              detail: {
                prop: propertyKey,
                descriptor: propertyDescriptor,
              },
            }, eventTarget
          ))
        }
        return root
      }
    }
  )
}