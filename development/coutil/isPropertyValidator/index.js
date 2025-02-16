import * as Variables from '../variables/index.js'
export default function isPropertyValidator($propertyValidator) {
  if(
    Object.getOwnPropertyDescriptor($propertyValidator, 'value') &&
    (
      Variables.TypeValues.includes($propertyValidator.type) ||
      Variables.TypeKeys.includes($propertyValidator.type)
    ) || (
      typeof $propertyValidator.type === 'object' &&
      Object.getOwnPropertyDescriptor($propertyValidator.type, 'value') &&
      (
        Variables.TypeValues.includes($propertyValidator.type.value) ||
        Variables.TypeKeys.includes($propertyValidator.type.value)
      )
    )
  ) { return true } 
  else { return false }
}