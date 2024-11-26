const definePropertiesTree = ($descriptorTree) => {
  let properties
  if(Array.isArray($descriptorTree)) { properties = [] }
  else if(typeof $descriptorTree === 'object') { properties = {} }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($descriptorTree)) {
    const propertyDescriptorValue = $propertyDescriptor.value
    if(typeof propertyDescriptorValue === 'object') {
      properties[$propertyKey] = definePropertiesTree(propertyDescriptorValue)
    }
    else {
      properties[$propertyKey] = propertyDescriptorValue
    }
  }
  return properties
}
export default definePropertiesTree