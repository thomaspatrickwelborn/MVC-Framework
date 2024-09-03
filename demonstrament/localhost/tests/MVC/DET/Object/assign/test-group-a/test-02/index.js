const objectAssignStatementString = `
$object.assign({
  aaa: 111111,
  bbb: false,
  ccc: "333333",
  ddd: true,
})
`
export default function test02($object) {
  console.log(
    "-----", 
    "\n", "Test Group A. #02 | Reassign Mono-Dimension Object Properties"
  )
  console.log(objectAssignStatementString)
  $object.assign({
    aaa: 111111,
    bbb: false,
    ccc: "333333",
    ddd: true,
  })
  console.log(
    '\n', `$object.aaa === 111111`, 
    '\n', `${$object.aaa} === ${111111}`, 
    '\n', $object.aaa === 111111
  )
  console.log(
    '\n', `$object.bbb === false`, 
    '\n', `${$object.bbb} === ${false}`, 
    '\n', $object.bbb === false
  )
  console.log(
    '\n', `$object.ccc === "333333"`, 
    '\n', `${$object.ccc} === ${"333333"}`, 
    '\n', $object.ccc === "333333"
  )
  console.log(
    '\n', `$object.ddd === true`, 
    '\n', `${$object.ddd} === ${true}`, 
    '\n', $object.ddd === true
  )
  console.log(
    '\n', "Test Group A. #02 | Results", 
    '\n', 'PASS', (
      $object.aaa === 111111 &&
      $object.bbb === false &&
      $object.ccc === "333333" &&
      $object.ddd === true
    ),
    '\n', 'object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'json', 
    '\n', $object.parse({ type: 'json' })
  )
}