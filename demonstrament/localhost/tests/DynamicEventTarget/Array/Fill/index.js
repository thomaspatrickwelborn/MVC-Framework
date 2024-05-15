import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayFillTest() {
  ArrayFillTestA()
}

// Value
// -----
// Value is Boolean
// Value is Number
// Value is String
// Value is Object
// Value is Array
// Value is Map

// Indices
// -----
// Start Index is Positive
// End Index is Positive
// Start, End Indices are Positive
// Start Index is Negative
// End Index is Negative
// Start, End Indices are Negative

const StringFill = ($character, $length) => {
  const strings = []
  strings.length = $length
  strings.fill($character, 0, $length)
  return strings.join('')
}

const Values = {
  // Booleans
  Booleans: [true, false], 
  // Numbers
  Numbers: [0, 10, 100, 1000, 10000],
  // Strings
  Strings: [
    StringFill('A', 1), StringFill('A', 2), StringFill('A', 3), StringFill('A', 4), 
    StringFill('A', 5)
  ],
}
// Objects
Values.Objects = [
  structuredClone(Values), structuredClone(Values), structuredClone(Values), 
  structuredClone(Values), structuredClone(Values)
]
// Arrays
Values.Arrays = [
  Object.values(structuredClone(Values)), Object.values(structuredClone(Values)), 
  Object.values(structuredClone(Values)), Object.values(structuredClone(Values)), 
  Object.values(structuredClone(Values))
]

const PositiveStartPositiveEndIndexRange = [
  [0, 1], 
  [0, 10], [0, 100], [0, 1000], [0, 10000],
]
const PositiveStartNegativeEndIndexRange = [
  [0, -1], 
  [0, -10], [0, -100], [0, -1000], [0, -10000]
]
const NegativeStartNegativeEndIndexRange = [
  [-10, -1], [-100, -1], [-1000, -1], [-10000, -1]
]
const NegativeStartPositiveEndIndexRange = [
  [-10, -1], [-100, -1], [-100, -1], [-100, -1], 
]

function ArrayFillTestA() {
  iterateIndexRanges: 
  for(const $range of PositiveStartPositiveEndIndexRange) {
    const [$start, $end] = $range
    iterateValueTypes: 
    for(const [
      $valueType, $values
    ] of Object.entries(Values)) {
      iterateValues: 
      for(const $value of $values) {
        // Test Array Fill
        const array = []
        array.length = $end
        array.fill($value, $start, $end)
        const detArray = new DynamicEventTarget([])
        detArray.length = $end
        detArray.fill($value, $start, $end)
        console.log([
          `start: ${$start}, end: ${$end}`,
          `valueType: ${$valueType}, value: ${$value}`,
        ].join('\n'))
        console.assert(
          array.length === detArray.length,
          [
            `array.length !== detArray.length`,
            `${array.length} !== ${detArray.length}`,
            `${array.length === detArray.length}`,
          ].join('\n')
        )
      }
    }
  }
}
