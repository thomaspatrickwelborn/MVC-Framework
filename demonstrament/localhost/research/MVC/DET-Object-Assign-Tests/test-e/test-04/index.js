const arrayAssignStatementString = `
`
export default function test04($object) {
  console.log(
    "------",
    "\n", "Test Group E. #04 | Delete Multi-Dimension Mixed Object/Array Properties"
  )
  console.log(arrayAssignStatementString)
  $object.assign({
    aaa: {
      0: {
        ccc: {
          0: undefined,
          1: undefined,
        }
      },
      1: {
        0: undefined,
        1: undefined,
      }
    }
  })
  delete $object.aaa[0].ccc[0]
  delete $object.aaa[0].ccc[1]
  delete $object.aaa[1][0]
  delete $object.aaa[1][1]
  $object.aaa[0].ccc.length = 0
  $object.aaa[1].length = 0
  console.log(
    '\n', `$object.aaa[0].ccc[0] === undefined`,
    '\n', `${$object.aaa[0].ccc[0]} === {undefined}`,
    '\n', $object.aaa[0].ccc[0] === undefined
  )
  console.log(
    '\n', `$object.aaa[0].ccc[1] === undefined`,
    '\n', `${$object.aaa[0].ccc[1]} === ${undefined}`,
    '\n', $object.aaa[0].ccc[1] === undefined
  )
  console.log(
    '\n', `$object.aaa[1][0] === undefined`,
    '\n', `${$object.aaa[1][0]} === ${undefined}`,
    '\n', $object.aaa[1][0] === undefined
  )
  console.log(
    '\n', `$object.aaa[1][1] === undefined`,
    '\n', `${$object.aaa[1][1]} === ${undefined}`,
    '\n', $object.aaa[1][1] === undefined
  )
  console.log(
    '\n', `$object.aaa[0].ccc.length === 0`,
    '\n', `${$object.aaa[0].ccc.length} === ${0}`,
    '\n', $object.aaa[0].ccc.length === 0
  )
  console.log(
    '\n', `$object.aaa[1].length === 0`,
    '\n', `${$object.aaa[1].length} === ${0}`,
    '\n', $object.aaa[1].length === 0
  )
  console.log(
    '\n', "Test #04 | Results", 
    '\n', "Pass", (
      $object.aaa[0].ccc[0] === undefined &&
      $object.aaa[0].ccc[1] === undefined &&
      $object.aaa[1][0] === undefined &&
      $object.aaa[1][1] === undefined &&
      $object.aaa[0].ccc.length === 0 &&
      $object.aaa[1].length === 0
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}