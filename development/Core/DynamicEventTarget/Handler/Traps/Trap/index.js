export default class Trap {
  constructor($methods, $aliases, $options = {}) {
    for(let [
      $methodName, $definePropertyMethod
    ] of Object.entries($methods)) {
      const methodOptions = $options[$methodName]
      $definePropertyMethod(
        this, $methodName, $aliases, methodOptions
      )
    }
  }
}