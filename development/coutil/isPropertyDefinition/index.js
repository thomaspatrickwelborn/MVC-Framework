import * as Variables from '../variables/index.js'
export default function isPropertyDefinition($propertyDefinition) {
  if(
    Object.getOwnPropertyDescriptor($propertyDefinition, 'type') &&
    (
      Variables.TypeValues.includes($propertyDefinition.type) ||
      Variables.TypeKeys.includes($propertyDefinition.type)
    ) || (
      typeof $propertyDefinition.type === 'object' &&
      Object.getOwnPropertyDescriptor($propertyDefinition.type, 'value') &&
      (
        Variables.TypeValues.includes($propertyDefinition.type.value) ||
        Variables.TypeKeys.includes($propertyDefinition.type.value)
      )
    )
  ) { return true } 
  else { return false }
}