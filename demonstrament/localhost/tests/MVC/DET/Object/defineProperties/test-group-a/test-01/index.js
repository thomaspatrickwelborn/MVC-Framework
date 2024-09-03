const objectAssignStatementString = `
$object.defineProperties({
  aaa: { value: 111 },
  bbb: { value: true },
  ccc: { value: "333" },
  ddd: { value: false },
  eee: { value: null },
})
`
export default function test01($object) {
  console.log(
    "------",
    "\n", "Test #01 | Define Default Mono-Dimension Object Properties"
  )
  console.log(objectAssignStatementString)
  $object.defineProperties({
    aaa: { value: 111 },
    bbb: { value: true },
    ccc: { value: "333" },
    ddd: { value: false },
    eee: { value: null },
  })
  const objectPropertyDescriptors = Object.getOwnPropertyDescriptors($object)
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.aaa.configurable === false`, 
    '\n', `${objectPropertyDescriptors.aaa.configurable} === ${false}`, 
    '\n', objectPropertyDescriptors.aaa.configurable === false,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.aaa.enumerable === false`, 
    '\n', `${objectPropertyDescriptors.aaa.enumerable} === ${false}`, 
    '\n', objectPropertyDescriptors.aaa.enumerable === false,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.aaa.value === 111`, 
    '\n', `${objectPropertyDescriptors.aaa.value} === ${111}`, 
    '\n', objectPropertyDescriptors.aaa.value === 111,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.aaa.writable === false`, 
    '\n', `${objectPropertyDescriptors.aaa.writable} === ${false}`, 
    '\n', objectPropertyDescriptors.aaa.writable === false,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.bbb.configurable === false`, 
    '\n', `${objectPropertyDescriptors.bbb.configurable} === ${false}`, 
    '\n', objectPropertyDescriptors.bbb.configurable === false,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.bbb.enumerable === false`, 
    '\n', `${objectPropertyDescriptors.bbb.enumerable} === ${false}`, 
    '\n', objectPropertyDescriptors.bbb.enumerable === false,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.bbb.value === true`, 
    '\n', `${objectPropertyDescriptors.bbb.value} === ${true}`, 
    '\n', objectPropertyDescriptors.bbb.value === true,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.bbb.writable === false`, 
    '\n', `${objectPropertyDescriptors.bbb.writable} === ${false}`, 
    '\n', objectPropertyDescriptors.bbb.writable === false,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.ccc.configurable === false`,
    '\n', `${objectPropertyDescriptors.ccc.configurable} === ${false}`, 
    '\n', objectPropertyDescriptors.ccc.value.configurable === false,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.ccc.enumerable === false`,
    '\n', `${objectPropertyDescriptors.ccc.enumerable} === ${false}`, 
    '\n', objectPropertyDescriptors.ccc.value.enumerable === false,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.ccc.value === "333"`,
    '\n', `${objectPropertyDescriptors.ccc.value} === ${"333"}`, 
    '\n', objectPropertyDescriptors.ccc.value === "333",
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.ccc.writable === false`,
    '\n', `${objectPropertyDescriptors.ccc.writable} === ${false}`, 
    '\n', objectPropertyDescriptors.ccc.writable === false,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.ddd.configurable === false`, 
    '\n', `${objectPropertyDescriptors.ddd.enumerable} === ${false}`, 
    '\n', objectPropertyDescriptors.ddd.enumerable === false,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.ddd.enumerable === false`, 
    '\n', `${objectPropertyDescriptors.ddd.enumerable} === ${false}`, 
    '\n', objectPropertyDescriptors.ddd.enumerable === false,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.ddd.value === false`, 
    '\n', `${objectPropertyDescriptors.ddd.value} === ${false}`, 
    '\n', objectPropertyDescriptors.ddd.value === false,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.ddd.writable === false`, 
    '\n', `${objectPropertyDescriptors.ddd.writable} === ${false}`, 
    '\n', objectPropertyDescriptors.ddd.writable === false,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.eee.configurable === false`, 
    '\n', `${objectPropertyDescriptors.eee.configurable} === ${false}`, 
    '\n', objectPropertyDescriptors.eee.configurable === false,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.eee.enumerable === false`, 
    '\n', `${objectPropertyDescriptors.eee.enumerable} === ${false}`, 
    '\n', objectPropertyDescriptors.eee.enumerable === false,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.eee.value === null`, 
    '\n', `${objectPropertyDescriptors.eee.value} === ${null}`, 
    '\n', objectPropertyDescriptors.eee.value === null,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.eee.writable === false`, 
    '\n', `${objectPropertyDescriptors.eee.writable} === ${false}`, 
    '\n', objectPropertyDescriptors.eee.writable === false,
  )
  console.log(
    '\n', "Test #01 | Results", 
    '\n', 'PASS', (
      objectPropertyDescriptors.aaa.configurable === false &&
      objectPropertyDescriptors.aaa.enumerable === false &&
      objectPropertyDescriptors.aaa.value === 111 &&
      objectPropertyDescriptors.aaa.writable === false &&
      objectPropertyDescriptors.bbb.configurable === false &&
      objectPropertyDescriptors.bbb.enumerable === false &&
      objectPropertyDescriptors.bbb.value === true &&
      objectPropertyDescriptors.bbb.writable === false &&
      objectPropertyDescriptors.ccc.configurable === false &&
      objectPropertyDescriptors.ccc.enumerable === false &&
      objectPropertyDescriptors.ccc.value === "333" &&
      objectPropertyDescriptors.ccc.writable === false &&
      objectPropertyDescriptors.ddd.configurable === false &&
      objectPropertyDescriptors.ddd.enumerable === false &&
      objectPropertyDescriptors.ddd.value === false &&
      objectPropertyDescriptors.ddd.writable === false &&
      objectPropertyDescriptors.eee.configurable === false &&
      objectPropertyDescriptors.eee.enumerable === false &&
      objectPropertyDescriptors.eee.value === null &&
      objectPropertyDescriptors.eee.writable === false
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}