const objectAssignStatementString = `
$object.aaa = undefined
$object.bbb = undefined
$object.ccc = undefined
$object.ddd = undefined
$object.eee = undefined
`
export default function test02($object) {
  console.log(
    "------",
    "\n", "Test #02 | Undefine Configurable/Enumerable/Writable Mono-Dimension Object Properties"
  )
  console.log(objectAssignStatementString)
  $object.aaa = undefined
  $object.bbb = undefined
  $object.ccc = undefined
  $object.ddd = undefined
  $object.eee = undefined
  const objectPropertyDescriptors = Object.getOwnPropertyDescriptors($object)
  // -----
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "aaa" })`,
    '\n', `${Object.hasOwn({ prop: "aaa" })}`,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.aaa.value === undefined`, 
    '\n', `${objectPropertyDescriptors.aaa.value} === ${undefined}`, 
    '\n', objectPropertyDescriptors.aaa.value === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "bbb" })`,
    '\n', `${Object.hasOwn({ prop: "bbb" })}`,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.bbb.value === undefined`, 
    '\n', `${objectPropertyDescriptors.bbb.value} === ${undefined}`, 
    '\n', objectPropertyDescriptors.bbb.value === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "ccc" })`,
    '\n', `${Object.hasOwn({ prop: "ccc" })}`,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.ccc.value === undefined`,
    '\n', `${objectPropertyDescriptors.ccc.value} === ${undefined}`, 
    '\n', objectPropertyDescriptors.ccc.value === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "ddd" })`,
    '\n', `${Object.hasOwn({ prop: "ddd" })}`,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.ddd.value === undefined`, 
    '\n', `${objectPropertyDescriptors.ddd.value} === ${undefined}`, 
    '\n', objectPropertyDescriptors.ddd.value === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "eee" })`,
    '\n', `${Object.hasOwn({ prop: "eee" })}`,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.eee.value === undefined`, 
    '\n', `${objectPropertyDescriptors.eee.value} === ${undefined}`, 
    '\n', objectPropertyDescriptors.eee.value === undefined,
  )
  console.log(
    '\n', "Test #02 | Results", 
    '\n', 'PASS', (
      `${Object.hasOwn({ prop: "aaa" })}` &&
      objectPropertyDescriptors.aaa.value === undefined &&
      `${Object.hasOwn({ prop: "bbb" })}` &&
      objectPropertyDescriptors.bbb.value === undefined &&
      `${Object.hasOwn({ prop: "ccc" })}` &&
      objectPropertyDescriptors.ccc.value === undefined &&
      `${Object.hasOwn({ prop: "ddd" })}` &&
      objectPropertyDescriptors.ddd.value === undefined &&
      `${Object.hasOwn({ prop: "eee" })}` &&
      objectPropertyDescriptors.eee.value === undefined
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}