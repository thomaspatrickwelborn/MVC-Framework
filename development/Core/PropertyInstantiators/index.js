// Core Class Instantiation
function CoreClassInstantiator($propertyClass, $property, $value) {
  const { core, target, Class, ClassInstantiator, Names } = $propertyClass
  const valueInstanceOfClass = $value instanceof Class
  if(valueInstanceOfClass === false) {
    const parent = core
    const path = (core.path)
      ? [core.path, Names.Multiple.Nonformal, $property].join('.')
      : [Names.Multiple.Nonformal, $property].join('.')
    const propertyClassInstanceParameters = [].concat($value)
    const $settings = Object.assign({ path, parent }, propertyClassInstanceParameters.shift())
    const $options = propertyClassInstanceParameters.shift()
    target[$property] = new Class($settings, $options)
  }
  else if(valueInstanceOfClass === true) {
    if($value.parent === undefined && $value.path === undefined) {
      $value.parent = parent
      $value.path = path
    }
    target[$property] = $value
  }
  return target[$property]
}
// Core Class Deinstantiation
function CoreClassDeinstantiator($propertyClass, $property) {
  const { target } = $propertyClass
  return delete target[$property]
}
export {
  CoreClassInstantiator,
  CoreClassDeinstantiator,
}