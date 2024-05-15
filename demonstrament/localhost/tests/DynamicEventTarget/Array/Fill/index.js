import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
import Values from './Values.js'
import Ranges from './Ranges.js'

export default function ArrayFillTest() {
  // Iterate Range Groups
  iterateRangeGroups:
  for(const [
    $rangeName, $ranges
  ] of Object.entries(Ranges)) {
    // Iterate Ranges
    iterateRanges:
    for(const $range of $ranges) {
      const [$length, $start, $end] = $range
      // Iterate Value Types
      iterateValueTypes: 
      for(const [
        $valueType, $values
      ] of Object.entries(Values)) {
        // Iterate Values
        iterateValues: 
        for(const $value of $values) {
          // Test Array Fill
          const array = []
          array.length = $length
          array.fill($value, $start, $end)
          const lengthAssertion = array.length === $length
          console.assert(
            lengthAssertion,
            [
              `array.length !== $length`,
              `${array.length} !== ${$length}`,
              `${array.length === $length}`,
            ].join('\n')
          )
          var arrayIndex = 0
          while(arrayIndex < array.length) {
            let arrayItem = array.at(arrayIndex)
            const itemAssertion = arrayItem === $value
            console.log(arrayItem, $value)
            console.assert(
              arrayItem === $value,
              [
                [`arrayItem (${arrayIndex}) value should be `, $value].join(''),
                [`arrayItem (${arrayIndex}) is `, arrayItem].join(''),
              ].join('\n')
            )
            arrayIndex++
          }
        }
      }
    }
  }
  return {}
}
