const objectAssignStatementString = `
$object.aaa.bbb.ccc.ddd = undefined
$object.aaa.bbb.ccc.eee = undefined
$object.aaa.fff.ggg = undefined
$object.aaa.fff.hhh = undefined
`
export default function test03($object) {
  console.log(
    "-----", 
    "\n", "Test #03 | Undefine Configurable/Enumerable/Writable Multi-Dimension Object Properties",
  )
  console.log(objectAssignStatementString)
  $object.aaa.bbb.ccc.ddd = undefined
  $object.aaa.bbb.ccc.eee = undefined
  $object.aaa.fff.ggg = undefined
  $object.aaa.fff.hhh = undefined
  console.log(
    '\n', `$object.aaa.bbb.ccc.ddd === undefined`,
    '\n', `${$object.aaa.bbb.ccc.ddd} === ${undefined}}`,
    '\n', $object.aaa.bbb.ccc.ddd === undefined,
  )
  console.log(
    '\n', `Object.hasOwn($object.aaa.bbb.ccc, 'ddd') === true`,
    '\n', `${Object.hasOwn($object.aaa.bbb.ccc, 'ddd')} === ${true}`,
    '\n', Object.hasOwn($object.aaa.bbb.ccc, 'ddd') === true
  )
  console.log(
    '\n', `$object.aaa.bbb.ccc.eee === undefined`,
    '\n', `${$object.aaa.bbb.ccc.eee} === ${undefined}}`,
    '\n', $object.aaa.bbb.ccc.eee === undefined,
  )
  console.log(
    '\n', `Object.hasOwn($object.aaa.bbb.ccc, 'eee') === true`,
    '\n', `${Object.hasOwn($object.aaa.bbb.ccc, 'eee')} === ${true}`,
    '\n', Object.hasOwn($object.aaa.bbb.ccc, 'eee') === true
  )
  console.log(
    '\n', `$object.aaa.fff.ggg === undefined`,
    '\n', `${$object.aaa.fff.ggg} === ${undefined}}`,
    '\n', $object.aaa.fff.ggg === undefined,
  )
  console.log(
    '\n', `Object.hasOwn($object.aaa.fff, 'ggg') === true`,
    '\n', `${Object.hasOwn($object.aaa.fff, 'ggg')} === ${true}`,
    '\n', Object.hasOwn($object.aaa.fff, 'ggg') === true
  )
  console.log(
    '\n', `$object.aaa.fff.hhh === undefined`,
    '\n', `${$object.aaa.fff.hhh} === ${undefined}}`,
    '\n', $object.aaa.fff.hhh === undefined,
  )
  console.log(
    '\n', `Object.hasOwn($object.aaa.fff, 'hhh') === true`,
    '\n', `${Object.hasOwn($object.aaa.fff, 'hhh')} === ${true}`,
    '\n', Object.hasOwn($object.aaa.fff, 'hhh') === true
  )
  console.log(
    '\n', "Test Group B. #03 | Results",
    '\n', (
      $object.aaa.bbb.ccc.ddd === undefined &&
      Object.hasOwn($object.aaa.bbb.ccc, 'ddd') === true &&
      $object.aaa.bbb.ccc.eee === undefined &&
      Object.hasOwn($object.aaa.bbb.ccc, 'eee') === true &&
      $object.aaa.fff.ggg === undefined &&
      Object.hasOwn($object.aaa.fff, 'ggg') === true &&
      $object.aaa.fff.hhh === undefined &&
      Object.hasOwn($object.aaa.fff, 'hhh') === true
    ),
    '\n', 'Parse Object',
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON',
    '\n', $object.parse({ type: 'json' }),
  )
}