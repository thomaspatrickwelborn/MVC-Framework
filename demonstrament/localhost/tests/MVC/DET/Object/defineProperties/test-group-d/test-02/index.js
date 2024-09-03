const arrayAssignStatementString = `
`
export default function test14($array) {
  console.log(
    "------",
    "\n", "Test #14 | Ressign Multi-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  $array.assign({
    0: {
      0: {
        0: false,
        1: undefined,
      }
    }
  })
  $array.assign({
    1: {
      0: true, 
      1: null,
    }
  })
  console.log(
    '\n', `$array[0][0][0] === false`,
    '\n', `${$array[0][0][0]} === ${false}`,
    '\n', $array[0][0][0] === false
  )
  console.log(
    '\n', `$array[0][0][1] === undefined`,
    '\n', `${$array[0][0][1]} === ${undefined}`,
    '\n', $array[0][0][1] === undefined
  )
  console.log(
    '\n', `$array[1][0] === true`,
    '\n', `${$array[1][0]} === ${true}`,
    '\n', $array[1][0] === true
  )
  console.log(
    '\n', `$array[1][1] === null`,
    '\n', `${$array[1][1]} === ${null}`,
    '\n', $array[1][1] === null
  )
  console.log(
    '\n', "Test #14 | Results", 
    '\n', "Pass", (
      $array[0][0][0] === false &&
      $array[0][0][1] === undefined &&
      $array[1][0] === true &&
      $array[1][1] === null
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}