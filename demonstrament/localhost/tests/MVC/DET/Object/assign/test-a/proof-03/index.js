const objectAssignStatementString = `
$object.assign({
  aaa: undefined,
  bbb: undefined,
  ccc: undefined,
  ddd: undefined,
})
`
export default function test03($object) {
  console.log(
    "-----", 
    "\n", "Test Group A. #03 | Unassign Mono-Dimension Object Properties"
  )
  $object.assign({
    aaa: undefined,
    bbb: undefined,
    ccc: undefined,
    ddd: undefined,
  })
  console.log(
    '\n', `$object.aaa === undefined`, 
    '\n', `${$object.aaa} === ${undefined}`,
    '\n', $object.aaa === undefined
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("aaa") === true`, 
    '\n', `${$object.getOwnPropertyNames().includes("aaa")} === true`, 
    '\n', $object.getOwnPropertyNames().includes("aaa")
  )
  console.log(
    '\n', `$object.bbb === undefined`, 
    '\n', `${$object.bbb} === ${undefined}`,
    '\n', $object.bbb === undefined
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("bbb") === true`, 
    '\n', `${$object.getOwnPropertyNames().includes("bbb")} === true`, 
    '\n', $object.getOwnPropertyNames().includes("bbb")
  )
  console.log(
    '\n', `$object.ccc === undefined`, 
    '\n', `${$object.ccc} === ${undefined}`,
    '\n', $object.ccc === undefined
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("ccc") === true`, 
    '\n', `${$object.getOwnPropertyNames().includes("ccc")} === true`, 
    '\n', $object.getOwnPropertyNames().includes("ccc")
  )
  console.log(
    '\n', `$object.ddd === undefined`, 
    '\n', `${$object.ddd} === ${undefined}`,
    '\n', $object.ddd === undefined
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("ddd") === true`, 
    '\n', `${$object.getOwnPropertyNames().includes("ddd")} === true`, 
    '\n', $object.getOwnPropertyNames().includes("ddd")
  )
  console.log(
    '\n', "Test Group A. #03 | Results", 
    '\n', 'PASS', (
      (
        $object.aaa === undefined &&
        $object.getOwnPropertyNames().includes("aaa")
      ) &&
      (
        $object.bbb === undefined &&
        $object.getOwnPropertyNames().includes("bbb")
      ) && (
        $object.ccc === undefined &&
        $object.getOwnPropertyNames().includes("ccc")
      ) && (
        $object.ddd === undefined &&
        $object.getOwnPropertyNames().includes("ddd")
      )
    ),
    '\n', 'object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'json', 
    '\n', $object.parse({ type: 'json' })
  )
}