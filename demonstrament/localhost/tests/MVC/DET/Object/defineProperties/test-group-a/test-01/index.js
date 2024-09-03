const objectAssignStatementString = `
$object.assign({
  aaa: 111,
  bbb: true,
  ccc: "333",
  ddd: false,
  eee: null,
})
`
export default function test01($object) {
  console.log(
    "------",
    "\n", "Test #01 | Assign Mono-Dimension Object Properties"
  )
  console.log(objectAssignStatementString)
  $object.assign({
    aaa: 111,
    bbb: true,
    ccc: "333",
    ddd: false,
    eee: null,
  })
  console.log(
    '\n', `$object.aaa === 111`, 
    '\n', `${$object.aaa} === ${111}`, 
    '\n', $object.aaa === 111
  )
  console.log(
    '\n', `$object.bbb === true`, 
    '\n', `${$object.bbb} === ${true}`, 
    '\n', $object.bbb === true
  )
  console.log(
    '\n', `$object.ccc === "333"`, `
    '\n', ${$object.ccc} === "${333}"`, 
    '\n', $object.ccc === "333"
  )
  console.log(
    '\n', `$object.ddd === false`, 
    '\n', `${$object.ddd} === ${false}`, 
    '\n', $object.ddd === false
  )
  console.log(
    '\n', `$object.eee === null`, 
    '\n', `${$object.eee} === ${null}`, 
    '\n', $object.eee === null
  )
  console.log(
    '\n', "Test #01 | Results", 
    '\n', 'PASS', (
      $object.aaa === 111 &&
      $object.bbb === true &&
      $object.ccc === "333" &&
      $object.ddd === false &&
      $object.eee === null
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}