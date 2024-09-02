const objectAssignStatement = `
$object.assign({
  aaa: {
    bbb: {
      ccc: undefined,
    },
    fff: undefined
  },
})
`
export default function test07($object) {
  console.log(
    "-----", 
    "\n", "Test #07 | Unassign Multi-Dimension Object Properties",
  )
  console.log(objectAssignStatement)
  $object.assign({
    aaa: {
      bbb: {
        ccc: undefined,
      },
      fff: undefined
    },
  })
  console.log(
    '\n', `$object.aaa.bbb.ccc === undefined`,
    '\n', `${$object.aaa.bbb.ccc} === ${undefined}}`,
    '\n', $object.aaa.bbb.ccc === undefined,
  )
  console.log(
    '\n', `$object.aaa.bbb.getOwnPropertyNames().includes('ccc') === true`,
    '\n', `${$object.aaa.bbb.getOwnPropertyNames().includes('ccc')} === ${true}`,
    '\n', $object.aaa.bbb.getOwnPropertyNames().includes('ccc') === true,
  )
  console.log(
    '\n', `$object.aaa.fff === undefined`,
    '\n', `${$object.aaa.fff} === ${undefined}}`,
    '\n', $object.aaa.fff === undefined,
  )
  console.log(
    '\n', `$object.aaa.getOwnPropertyNames().includes('fff') === true`,
    '\n', `${$object.aaa.getOwnPropertyNames().includes('fff')} === ${true}`,
    '\n', $object.aaa.getOwnPropertyNames().includes('fff') === true,
  )
  console.log(
    '\n', "Test #07 | Results",
    '\n', (
      $object.aaa.bbb.ccc === undefined &&
      $object.aaa.bbb.getOwnPropertyNames().includes('ccc') === true &&
      $object.aaa.fff === undefined &&
      $object.aaa.getOwnPropertyNames().includes('fff') === true
    ),
    '\n', 'Parse Object',
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON',
    '\n', $object.parse({ type: 'json' }),
  )
}