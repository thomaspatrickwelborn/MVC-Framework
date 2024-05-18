export default function typedInstance($valueType) {
  return (
    $valueType === 'object'
  ) ? new Object()
    : (
    $valueType === 'array'
  ) ? new Array()
    : (
    $valueType === 'map'
  ) ? new Map()
    : new Object()
}