const objectDeleteStatmentString = `
delete $object.aaa
delete $object.bbb
delete $object.ccc
delete $object.ddd
delete $object.eee
`
export default function test04($object) {
  console.log(
    "-----", 
    "\n", "Test Group A. #04 | Delete Mono-Dimension Object Properties"
  )
  console.log(objectDeleteStatmentString)
  delete $object.aaa
  delete $object.bbb
  delete $object.ccc
  delete $object.ddd
  delete $object.eee
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("aaa") === false`, 
    '\n', `${$object.getOwnPropertyNames().includes("aaa")} === false`, 
    '\n', $object.getOwnPropertyNames().includes("aaa") === false
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("bbb") === false`, 
    '\n', `${$object.getOwnPropertyNames().includes("bbb")} === false`, 
    '\n', $object.getOwnPropertyNames().includes("bbb") === false
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("ccc") === false`, 
    '\n', `${$object.getOwnPropertyNames().includes("ccc")} === false`, 
    '\n', $object.getOwnPropertyNames().includes("ccc") === false
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("ddd") === false`, 
    '\n', `${$object.getOwnPropertyNames().includes("ddd")} === false`, 
    '\n', $object.getOwnPropertyNames().includes("ddd") === false
  )
  console.log(
    '\n', `$object.getOwnPropertyNames().includes("eee") === false`, 
    '\n', `${$object.getOwnPropertyNames().includes("eee")} === false`, 
    '\n', $object.getOwnPropertyNames().includes("eee") === false
  )
  console.log(
    '\n', "Test Group A. #04 | Results", 
    '\n', 'PASS', (
      (
        $object.aaa === undefined &&
        !$object.getOwnPropertyNames().includes("aaa")
      ) &&
      (
        $object.bbb === undefined &&
        !$object.getOwnPropertyNames().includes("bbb")
      ) && (
        $object.ccc === undefined &&
        !$object.getOwnPropertyNames().includes("ccc")
      ) && (
        $object.ddd === undefined &&
        !$object.getOwnPropertyNames().includes("ddd")
      ) && (
        $object.eee === undefined &&
        !$object.getOwnPropertyNames().includes("eee")
      )
    ),
    '\n', 'object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'json', 
    '\n', $object.parse({ type: 'json' })
  )
}