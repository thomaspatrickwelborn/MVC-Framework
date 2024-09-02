const arrayAssignStatementString = `
`
export default function test16($array) {
  console.log(
    "------",
    "\n", "Test #16 | Delete Multi-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  delete $array[0][0][0]
  delete $array[0][0][1]
  delete $array[1][0]
  delete $array[1][1]
  $array.assign({
    0: {
      0: {
        0: undefined,
        1: undefined,
      }
    },
    1: {
      0: undefined, 
      1: undefined,
    }
  })
  $array[0][0].length = 0
  $array[1].length = 0
  console.log(
    '\n', `$array[0][0][0] === undefined`,
    '\n', `${$array[0][0][0]} === ${undefined}`,
    '\n', $array[0][0][0] === undefined
  )
  console.log(
    '\n', `$array[0][0][1] === undefined`,
    '\n', `${$array[0][0][1]} === ${undefined}`,
    '\n', $array[0][0][1] === undefined
  )
  console.log(
    '\n', `$array[1][0] === undefined`,
    '\n', `${$array[1][0]} === ${undefined}`,
    '\n', $array[1][0] === undefined
  )
  console.log(
    '\n', `$array[1][1] === undefined`,
    '\n', `${$array[1][1]} === ${undefined}`,
    '\n', $array[1][1] === undefined
  )
  console.log(
    '\n', `$array[0][0].length === 0`,
    '\n', `${$array[0][0].length} === ${0}`,
    '\n', $array[0][0].length === 0
  )
  console.log(
    '\n', `$array[1].length === 0`,
    '\n', `${$array[1].length} === ${0}`,
    '\n', $array[1].length === 0
  )
  console.log(
    '\n', "Test #16 | Results", 
    '\n', "Pass", (
      $array[0][0][0] === undefined &&
      $array[0][0][1] === undefined &&
      $array[1][0] === undefined &&
      $array[1][1] === undefined &&
      $array[0][0].length === 0 &&
      $array[1].length === 0
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}