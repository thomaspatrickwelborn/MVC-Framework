const arrayAssignStatementString = `
delete $array[0]
delete $array[1]
delete $array[2]
delete $array[3]
delete $array[4]
delete $array[5]
delete $array[6]
delete $array[7]
`
export default function test04($array) {
  console.log(
    "------",
    "\n", "Test Group C. #04 | Delete Mono-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  delete $array[0]
  delete $array[1]
  delete $array[2]
  delete $array[3]
  delete $array[4]
  delete $array[5]
  delete $array[6]
  delete $array[7]
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
  $array.length = 0
  console.log(
    '\n', "Test Group C. #04 | Results", 
    '\n', "Pass", (
      $array[0] === undefined &&
      $array[1] === undefined &&
      $array[2] === undefined &&
      $array[3] === undefined &&
      $array[4] === undefined &&
      $array[5] === undefined &&
      $array[6] === undefined &&
      $array[7] === undefined &&
      $array.length === 0
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}