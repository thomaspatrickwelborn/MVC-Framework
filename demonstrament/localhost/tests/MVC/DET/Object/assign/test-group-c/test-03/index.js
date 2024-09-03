const arrayAssignStatementString = `
$array.assign([
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
])
`
export default function test11($array) {
  console.log(
    "------",
    "\n", "Test Group C. #03 | Unassign Mono-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  $array.assign([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ])
  console.log(
    '\n', `$array[0] === undefined`,
    '\n', `${$array[0]} === undefined`,
    '\n', $array[0] === undefined 
  )
  console.log(
    '\n', `$array[1] === undefined`,
    '\n', `${$array[1]} === undefined`,
    '\n', $array[1] === undefined 
  )
  console.log(
    '\n', `$array[2] === undefined`,
    '\n', `${$array[2]} === undefined`,
    '\n', $array[2] === undefined 
  )
  console.log(
    '\n', `$array[3] === undefined`,
    '\n', `${$array[3]} === undefined`,
    '\n', $array[3] === undefined 
  )
  console.log(
    '\n', `$array[4] === undefined`,
    '\n', `${$array[4]} === undefined`,
    '\n', $array[4] === undefined 
  )
  console.log(
    '\n', `$array[5] === undefined`,
    '\n', `${$array[5]} === undefined`,
    '\n', $array[5] === undefined 
  )
  console.log(
    '\n', `$array[6] === undefined`,
    '\n', `${$array[6]} === undefined`,
    '\n', $array[6] === undefined 
  )
  console.log(
    '\n', `$array[7] === undefined`,
    '\n', `${$array[7]} === undefined`,
    '\n', $array[7] === undefined 
  )
  console.log(
    '\n', "Test Group C. #03 | Results", 
    '\n', "Pass", (
      $array[0] === undefined &&
      $array[1] === undefined &&
      $array[2] === undefined &&
      $array[3] === undefined &&
      $array[4] === undefined &&
      $array[5] === undefined &&
      $array[6] === undefined &&
      $array[7] === undefined &&
      $array.length === 8
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}