const arrayAssignStatementString = `
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
`
export default function test03($array) {
  console.log(
    "------",
    "\n", "Test Group D. #03 | Unassign Multi-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
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
    '\n', `$array[0][0].length === 2`,
    '\n', `${$array[0][0].length} === ${2}`,
    '\n', $array[0][0].length === 2
  )
  console.log(
    '\n', `$array[1].length === 2`,
    '\n', `${$array[1].length} === ${2}`,
    '\n', $array[1].length === 2
  )
  console.log(
    '\n', "Test Group D. #03 | Results", 
    '\n', "Pass", (
      $array[0][0][0] === undefined &&
      $array[0][0][1] === undefined &&
      $array[1][0] === undefined &&
      $array[1][1] === undefined &&
      $array[0][0].length === 2 &&
      $array[1].length === 2
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}