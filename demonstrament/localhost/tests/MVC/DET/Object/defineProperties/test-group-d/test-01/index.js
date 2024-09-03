const arrayAssignStatementString = `
`
export default function test13($array) {
  console.log(
    "------",
    "\n", "Test #13 | Assign Initial Multi-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  $array.assign([
    [
      [true, null]
    ],
    [false, undefined],
  ])
  console.log($array[0][0][0])
  console.log(
    '\n', `$array[0][0][0] === true`,
    '\n', `${$array[0][0][0]} === ${true}`,
    '\n', $array[0][0][0] === true
  )
  console.log(
    '\n', `$array[0][0][1] === null`,
    '\n', `${$array[0][0][1]} === ${null}`,
    '\n', $array[0][0][1] === null
  )
  console.log(
    '\n', `$array[1][0] === false`,
    '\n', `${$array[1][0]} === ${false}`,
    '\n', $array[1][0] === false
  )
  console.log(
    '\n', `$array[1][1] === undefined`,
    '\n', `${$array[1][1]} === ${undefined}`,
    '\n', $array[1][1] === undefined
  )
  console.log(
    '\n', "Test #13 | Results", 
    '\n', "Pass", (
      $array[0][0][0] === true &&
      $array[0][0][1] === null &&
      $array[1][0] === false &&
      $array[1][1] === undefined
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}