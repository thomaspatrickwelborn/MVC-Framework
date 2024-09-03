const objectAssignStatementString = `
$object.defineProperties({
  aaa: {
    configurable: true,
    enumerable: true,
    value: 111,
    writable: true,
  },
  bbb: {
    configurable: true,
    enumerable: true,
    value: true,
    writable: true,
  },
  ccc: {
    configurable: true,
    enumerable: true,
    value: "333",
    writable: true,
  },
  ddd: {
    configurable: true,
    enumerable: true,
    value: false,
    writable: true,
  },
  eee: {
    configurable: true,
    enumerable: true,
    value: null,
    writable: true,
  },
})
`
export default function test02($object) {
  console.log(
    "------",
    "\n", "Test Group A. #02 | Define Configurable/Enumerable/Writable Mono-Dimension Object Properties"
  )
  console.log(objectAssignStatementString)
  $object.defineProperties({
    aaa: {
      configurable: true,
      enumerable: true,
      value: 111,
      writable: true,
    },
    bbb: {
      configurable: true,
      enumerable: true,
      value: true,
      writable: true,
    },
    ccc: {
      configurable: true,
      enumerable: true,
      value: "333",
      writable: true,
    },
    ddd: {
      configurable: true,
      enumerable: true,
      value: false,
      writable: true,
    },
    eee: {
      configurable: true,
      enumerable: true,
      value: null,
      writable: true,
    },
  })
  const objectPropertyDescriptors = Object.getOwnPropertyDescriptors($object)
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.aaa.configurable === true`, 
    '\n', `${objectPropertyDescriptors.aaa.configurable} === ${true}`, 
    '\n', objectPropertyDescriptors.aaa.configurable === true,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.aaa.enumerable === true`, 
    '\n', `${objectPropertyDescriptors.aaa.enumerable} === ${true}`, 
    '\n', objectPropertyDescriptors.aaa.enumerable === true,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.aaa.value === 111`, 
    '\n', `${objectPropertyDescriptors.aaa.value} === ${111}`, 
    '\n', objectPropertyDescriptors.aaa.value === 111,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.aaa.writable === true`, 
    '\n', `${objectPropertyDescriptors.aaa.writable} === ${true}`, 
    '\n', objectPropertyDescriptors.aaa.writable === true,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.bbb.configurable === true`, 
    '\n', `${objectPropertyDescriptors.bbb.configurable} === ${true}`, 
    '\n', objectPropertyDescriptors.bbb.configurable === true,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.bbb.enumerable === true`, 
    '\n', `${objectPropertyDescriptors.bbb.enumerable} === ${true}`, 
    '\n', objectPropertyDescriptors.bbb.enumerable === true,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.bbb.value === true`, 
    '\n', `${objectPropertyDescriptors.bbb.value} === ${true}`, 
    '\n', objectPropertyDescriptors.bbb.value === true,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.bbb.writable === true`, 
    '\n', `${objectPropertyDescriptors.bbb.writable} === ${true}`, 
    '\n', objectPropertyDescriptors.bbb.writable === true,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.ccc.configurable === true`,
    '\n', `${objectPropertyDescriptors.ccc.configurable} === ${true}`, 
    '\n', objectPropertyDescriptors.ccc.value.configurable === true,
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
    '\n', `objectPropertyDescriptors.ccc.writable === true`,
    '\n', `${objectPropertyDescriptors.ccc.writable} === ${true}`, 
    '\n', objectPropertyDescriptors.ccc.writable === true,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.ddd.configurable === true`, 
    '\n', `${objectPropertyDescriptors.ddd.enumerable} === ${true}`, 
    '\n', objectPropertyDescriptors.ddd.enumerable === true,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.ddd.enumerable === true`, 
    '\n', `${objectPropertyDescriptors.ddd.enumerable} === ${true}`, 
    '\n', objectPropertyDescriptors.ddd.enumerable === true,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.ddd.value === false`, 
    '\n', `${objectPropertyDescriptors.ddd.value} === ${false}`, 
    '\n', objectPropertyDescriptors.ddd.value === false,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.ddd.writable === true`, 
    '\n', `${objectPropertyDescriptors.ddd.writable} === ${true}`, 
    '\n', objectPropertyDescriptors.ddd.writable === true,
  )
  // -----
  // Configurable
  console.log(
    '\n', `objectPropertyDescriptors.eee.configurable === true`, 
    '\n', `${objectPropertyDescriptors.eee.configurable} === ${true}`, 
    '\n', objectPropertyDescriptors.eee.configurable === true,
  )
  // Enumerable
  console.log(
    '\n', `objectPropertyDescriptors.eee.enumerable === true`, 
    '\n', `${objectPropertyDescriptors.eee.enumerable} === ${true}`, 
    '\n', objectPropertyDescriptors.eee.enumerable === true,
  )
  // Value
  console.log(
    '\n', `objectPropertyDescriptors.eee.value === null`, 
    '\n', `${objectPropertyDescriptors.eee.value} === ${null}`, 
    '\n', objectPropertyDescriptors.eee.value === null,
  )
  // Writable
  console.log(
    '\n', `objectPropertyDescriptors.eee.writable === true`, 
    '\n', `${objectPropertyDescriptors.eee.writable} === ${true}`, 
    '\n', objectPropertyDescriptors.eee.writable === true,
  )
  console.log(
    '\n', "Test #02 | Results", 
    '\n', 'PASS', (
      objectPropertyDescriptors.aaa.configurable === true &&
      objectPropertyDescriptors.aaa.enumerable === true &&
      objectPropertyDescriptors.aaa.value === 111 &&
      objectPropertyDescriptors.aaa.writable === true &&
      objectPropertyDescriptors.bbb.configurable === true &&
      objectPropertyDescriptors.bbb.enumerable === true &&
      objectPropertyDescriptors.bbb.value === true &&
      objectPropertyDescriptors.bbb.writable === true &&
      objectPropertyDescriptors.ccc.configurable === true &&
      objectPropertyDescriptors.ccc.enumerable === true &&
      objectPropertyDescriptors.ccc.value === "333" &&
      objectPropertyDescriptors.ccc.writable === true &&
      objectPropertyDescriptors.ddd.configurable === true &&
      objectPropertyDescriptors.ddd.enumerable === true &&
      objectPropertyDescriptors.ddd.value === false &&
      objectPropertyDescriptors.ddd.writable === true &&
      objectPropertyDescriptors.eee.configurable === true &&
      objectPropertyDescriptors.eee.enumerable === true &&
      objectPropertyDescriptors.eee.value === null &&
      objectPropertyDescriptors.eee.writable === true
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}