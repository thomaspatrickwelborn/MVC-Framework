const arrayAssignStatementString = `
`
export default function test19($object) {
  console.log(
    "------",
    "\n", "Test #19 | Unassign Multi-Dimension Mixed Object/Array Properties"
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
    '\n', `$object.aaa[0].ccc.length === 2`,
    '\n', `${$object.aaa[0].ccc.length} === ${2}`,
    '\n', $object.aaa[0].ccc.length === 2
  )
  console.log(
    '\n', `$object.aaa[1].length === 2`,
    '\n', `${$object.aaa[1].length} === ${2}`,
    '\n', $object.aaa[1].length === 2
  )
  console.log(
    '\n', "Test #19 | Results", 
    '\n', "Pass", (
      $object.aaa[0].ccc[0] === undefined &&
      $object.aaa[0].ccc[1] === undefined &&
      $object.aaa[1][0] === undefined &&
      $object.aaa[1][1] === undefined &&
      $object.aaa[0].ccc.length === 2 &&
      $object.aaa[1].length === 2
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}