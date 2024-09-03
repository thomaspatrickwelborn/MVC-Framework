const objectAssignStatementString = `
delete $object.aaa
delete $object.bbb
delete $object.ccc
delete $object.ddd
delete $object.eee
`
export default function test02($object) {
  console.log(
    "------",
    "\n", "Test #02 | Undefine Configurable/Enumerable/Writable Mono-Dimension Object Properties"
  )
  console.log(objectAssignStatementString)
  delete $object.aaa
  delete $object.bbb
  delete $object.ccc
  delete $object.ddd
  delete $object.eee
  // -----
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "aaa" }) === false`,
    '\n', `${Object.hasOwn({ prop: "aaa" })} === ${false}`,
    '\n', Object.hasOwn({ prop: "aaa" }) === false,
  )
  // Value
  console.log(
    '\n', `$object.aaa === undefined`, 
    '\n', `${$object.aaa} === ${undefined}`, 
    '\n', $object.aaa === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "bbb" }) === false`,
    '\n', `${Object.hasOwn({ prop: "bbb" })} === ${false}`,
    '\n', Object.hasOwn({ prop: "bbb" }) === false,
  )
  // Value
  console.log(
    '\n', `$object.bbb === undefined`, 
    '\n', `${$object.bbb} === ${undefined}`, 
    '\n', $object.bbb === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "ccc" }) === false`,
    '\n', `${Object.hasOwn({ prop: "ccc" })} === ${false}`,
    '\n', Object.hasOwn({ prop: "ccc" }) === false,
  )
  // Value
  console.log(
    '\n', `$object.ccc === undefined`,
    '\n', `${$object.ccc} === ${undefined}`, 
    '\n', $object.ccc === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "ddd" }) === false`,
    '\n', `${Object.hasOwn({ prop: "ddd" })} === ${false}`,
    '\n', Object.hasOwn({ prop: "ddd" }) === false,
  )
  // Value
  console.log(
    '\n', `$object.ddd === undefined`, 
    '\n', `${$object.ddd} === ${undefined}`, 
    '\n', $object.ddd === undefined,
  )
  // Has Own
  console.log(
    '\n', `Object.hasOwn({ prop: "eee" }) === false`,
    '\n', `${Object.hasOwn({ prop: "eee" })} === ${false}`,
    '\n', Object.hasOwn({ prop: "eee" }) === false,
  )
  // Value
  console.log(
    '\n', `$object.eee === undefined`, 
    '\n', `${$object.eee} === ${undefined}`, 
    '\n', $object.eee === undefined,
  )
  console.log(
    '\n', "Test #02 | Results", 
    '\n', 'PASS', (
      `${!Object.hasOwn({ prop: "aaa" })}` &&
      $object.aaa === undefined &&
      `${!Object.hasOwn({ prop: "bbb" })}` &&
      $object.bbb === undefined &&
      `${!Object.hasOwn({ prop: "ccc" })}` &&
      $object.ccc === undefined &&
      `${!Object.hasOwn({ prop: "ddd" })}` &&
      $object.ddd === undefined &&
      `${!Object.hasOwn({ prop: "eee" })}` &&
      $object.eee === undefined
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}