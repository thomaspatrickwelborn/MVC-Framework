const arrayAssignStatementString = `
`
export default function test18($object) {
  console.log(
    "------",
    "\n", "Test #18 | Reassign Multi-Dimension Mixed Object/Array Properties"
  )
  console.log(arrayAssignStatementString)
  $object.assign({
    aaa: {
      0: {
        ccc: {
          0: false,
          1: undefined,
        }
      }
    }
  })
  $object.assign({
    aaa: {
      1: {
        0: true,
        1: null,
      }
    }
  })
  console.log(
    '\n', `$object.aaa[0].ccc[0] === false`,
    '\n', `${$object.aaa[0].ccc[0]} === {false}`,
    '\n', $object.aaa[0].ccc[0] === false
  )
  console.log(
    '\n', `$object.aaa[0].ccc[1] === undefined`,
    '\n', `${$object.aaa[0].ccc[1]} === ${undefined}`,
    '\n', $object.aaa[0].ccc[1] === undefined
  )
  console.log(
    '\n', `$object.aaa[1][0] === true`,
    '\n', `${$object.aaa[1][0]} === ${true}`,
    '\n', $object.aaa[1][0] === true
  )
  console.log(
    '\n', `$object.aaa[1][1] === null`,
    '\n', `${$object.aaa[1][1]} === ${null}`,
    '\n', $object.aaa[1][1] === null
  )
  console.log(
    '\n', "Test #18 | Results", 
    '\n', "Pass", (
      $object.aaa[0].ccc[0] === false &&
      $object.aaa[0].ccc[1] === undefined &&
      $object.aaa[1][0] === true &&
      $object.aaa[1][1] === null
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}