const arrayAssignStatementString = `
`
export default function test01($object) {
  console.log(
    "------",
    "\n", "Test Group E. #01 | Assign Initial Multi-Dimension Mixed Object/Array Properties"
  )
  console.log(arrayAssignStatementString)
  $object.assign({
    aaa: [
      {
        ccc: [true, null]
      },
      [false, undefined],
    ]
  })
  console.log(
    '\n', `$object.aaa[0].ccc[0] === true`,
    '\n', `${$object.aaa[0].ccc[0]} === {true}`,
    '\n', $object.aaa[0].ccc[0] === true
  )
  console.log(
    '\n', `$object.aaa[0].ccc[1] === null`,
    '\n', `${$object.aaa[0].ccc[1]} === ${null}`,
    '\n', $object.aaa[0].ccc[1] === null
  )
  console.log(
    '\n', `$object.aaa[1][0] === false`,
    '\n', `${$object.aaa[1][0]} === ${false}`,
    '\n', $object.aaa[1][0] === false
  )
  console.log(
    '\n', `$object.aaa[1][1] === undefined`,
    '\n', `${$object.aaa[1][1]} === ${undefined}`,
    '\n', $object.aaa[1][1] === undefined
  )
  console.log(
    '\n', "Test #01 | Results", 
    '\n', "Pass", (
      $object.aaa[0].ccc[0] === true &&
      $object.aaa[0].ccc[1] === null &&
      $object.aaa[1][0] === false &&
      $object.aaa[1][1] === undefined
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}