export default class Trap {
  constructor($methods, $aliases, $options = {}) {
    for(let [
      $methodName, $createPropertyMethod
    ] of Object.entries($methods)) {
      const methodOptions = $options[$methodName] || {}
      $createPropertyMethod(
        this, $methodName, $aliases, methodOptions
      )
    }
  }
}