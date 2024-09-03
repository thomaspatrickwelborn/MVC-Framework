const objectDefinePropertiesStatementString = `
$object.aaa[0].ccc[0] = undefined
$object.aaa[0].ccc[1] = undefined
$object.aaa[1][0] = undefined
$object.aaa[1][1] = undefined
`
export default function test03($object) {
  console.log(
    "------",
    "\n", "Test Group E. #03 | Undefine Configurable/Enumerable/Writable Multi-Dimension Mixed Object/Array Properties"
  )
  console.log(objectDefinePropertiesStatementString)
  $object.aaa[0].ccc[0] = undefined
  $object.aaa[0].ccc[1] = undefined
  $object.aaa[1][0] = undefined
  $object.aaa[1][1] = undefined
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
    '\n', "Test Group E. #03 | Results", 
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