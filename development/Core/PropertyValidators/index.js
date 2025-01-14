function CoreClassValidator($propertyClass, $property, $value) {
  const { core, target, Class, ClassInstantiator, Names } = $propertyClass
  return $value instanceof Class
}
export { CoreClassValidator }