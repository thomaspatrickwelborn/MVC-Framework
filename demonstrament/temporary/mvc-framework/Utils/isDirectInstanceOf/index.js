export default function isDirectInstanceOf($object, $constructor) {
    if(Array.isArray($constructor)) {
      let isDirectInstanceOf
      iterateConstructorClasses: 
      for(const $constructorClass of $constructor) {
        if(Object.getPrototypeOf($object) === $constructorClass.prototype) {
          return true
        }
      }
      return false
    } else {
      return Object.getPrototypeOf($object) === $constructor.prototype
    }
}