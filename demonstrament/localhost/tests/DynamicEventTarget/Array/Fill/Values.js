import StringFill from './StringFill.js'
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
var ValuesClone = structuredClone(Values)
// Objects
Values.Objects = [
  ValuesClone, ValuesClone, ValuesClone, 
  ValuesClone, ValuesClone
]
ValuesClone = Object.values(structuredClone(Values))
// Arrays
Values.Arrays = [
  ValuesClone, ValuesClone, 
  ValuesClone, ValuesClone, 
  ValuesClone
]
export default Values