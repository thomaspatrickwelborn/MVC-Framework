const deleteStringStatement = `
delete $object.aaa.bbb.ccc
delete $object.aaa.fff
`
export default function test08($object) {
  console.log(
    "-----", 
    "\n", "Test #08 | Delete Multi-Dimension Object Properties",
  )
  console.log(deleteStringStatement)
  delete $object.aaa.bbb.ccc
  delete $object.aaa.fff
  console.log(
    '\n', `$object.aaa.bbb.ccc === undefined`,
    '\n', `${$object.aaa.bbb.ccc} === ${undefined}}`,
    '\n', $object.aaa.bbb.ccc === undefined,
  )
  console.log(
    '\n', `$object.aaa.bbb.getOwnPropertyNames().includes('ccc') === false`,
    '\n', `${$object.aaa.bbb.getOwnPropertyNames().includes('ccc')} === ${false}`,
    '\n', $object.aaa.bbb.getOwnPropertyNames().includes('ccc') === false,
  )
  console.log(
    '\n', `$object.aaa.fff === undefined`,
    '\n', `${$object.aaa.fff} === ${undefined}}`,
    '\n', $object.aaa.fff === undefined,
  )
  console.log(
    '\n', `$object.aaa.getOwnPropertyNames().includes('fff') === false`,
    '\n', `${$object.aaa.getOwnPropertyNames().includes('fff')} === ${false}`,
    '\n', $object.aaa.getOwnPropertyNames().includes('fff') === false,
  )
  console.log(
    '\n', "Test #08 | Results",
    '\n', (
      $object.aaa.bbb.ccc === undefined &&
      $object.aaa.bbb.getOwnPropertyNames().includes('ccc') === false &&
      $object.aaa.fff === undefined &&
      $object.aaa.getOwnPropertyNames().includes('fff') === false
    ),
    '\n', 'Parse Object',
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON',
    '\n', $object.parse({ type: 'json' }),
  )
}