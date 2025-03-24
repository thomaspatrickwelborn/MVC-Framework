import Content from '../../../../../index.js'
export default function setContent($content, $options, $properties) {
  iterateProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($properties)) {
    $content.set($propertyKey, $propertyValue, $options)
  }
  return $content
}