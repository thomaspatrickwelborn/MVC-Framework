import PropertyClasses from './Properties/index.js'
import PropertyClassDefaultMethods from  './Properties/Default/index.js'

export default class Traps {
  Object = {}
  Array = {}
  Accessor = {}
  constructor($content) {
    // Iterate Property Classes
    iteratePropertyClasses:
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      // Property Class Trap
      const propertyClassTrap = this[PropertyClassName]
      const propertyClassTrapOptions = $content.options.traps[
        PropertyClassName.toLowerCase()
      ]
      const propertyClassDefaultTrap = PropertyClassDefaultMethods[PropertyClassName]
      const propertyClassTrapKeys = Object.keys(propertyClassTrapOptions)
      // Iterate Property Class Methods
      iteratePropertyClassMethods: 
      for(let [
        $methodName, $method
      ] of Object.entries(PropertyClassMethods)) {
        // Property Class Method: Trap
        if(propertyClassTrapKeys.includes($methodName)) {
          const methodOptions = propertyClassTrapOptions[$methodName] || {}
          const methodBindContent = $method.bind(null, $content, methodOptions)
          Object.defineProperty(propertyClassTrap, $methodName, {
            value: methodBindContent
          })
        }
        // Property Class Method: Default Trap Call
        else if(propertyClassDefaultTrap.Call.Keys.includes($methodName))  {
          const method = 
          Object.defineProperty(propertyClassTrap, $methodName, {
            value: propertyClassDefaultTrap.Call.Method($methodName)
          }) 
        }
        // Property Class Method: Default Trap Call Arguments
        else if(propertyClassDefaultTrap.CallArguments.Keys.includes($methodName)) {
          Object.defineProperty(propertyClassTrap, $methodName, {
            value: propertyClassDefaultTrap.CallArguments.Method($methodName)
          }) 
        }
      }
    }
  }
}