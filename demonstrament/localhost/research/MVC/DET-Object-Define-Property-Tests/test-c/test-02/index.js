const arrayAssignStatementString = `
$array.defineProperties({
  0: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: "aaa", 
   }
  1: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: "bbb", 
  },
  2: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: 222, 
  },
  3: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: 333, 
  },
  4: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: true, 
  },
  5: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: false, 
  },
  6: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: undefined, 
  },
  7: {
    configurable: true,
    writable: true,
    enumerable: true,
    value: null, 
  },
})
`
export default function test02($array) {
  console.log(
    "------",
    "\n", "Test Group C. #02 | Define Enumerable/Configurable/Writable Mono-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  $array.defineProperties({
    0: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: "aaaaaa", 
    },
    1: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: "bbbbbb", 
    },
    2: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 222222, 
    },
    3: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 333333, 
    },
    4: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: false, 
    },
    5: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: true, 
    },
    6: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: null, 
    },
    7: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: undefined, 
    },
  })
  console.log(
    '\n', `$array[0] === "aaaaaa"`,
    '\n', `${$array[0]} === ${"aaaaaa"}`,
    '\n', $array[0] === "aaaaaa", 
  )
  console.log(
    '\n', `$array[1] === "bbbbbb"`,
    '\n', `${$array[1]} === ${"bbbbbb"}`,
    '\n', $array[1] === "bbbbbb", 
  )
  console.log(
    '\n', `$array[2] === 222222`,
    '\n', `${$array[2]} === ${222222}`,
    '\n', $array[2] === 222222, 
  )
  console.log(
    '\n', `$array[3] === 333333`,
    '\n', `${$array[3]} === ${333333}`,
    '\n', $array[3] === 333333, 
  )
  console.log(
    '\n', `$array[4] === false`,
    '\n', `${$array[4]} === ${false}`,
    '\n', $array[4] === false, 
  )
  console.log(
    '\n', `$array[5] === true`,
    '\n', `${$array[5]} === ${true}`,
    '\n', $array[5] === true, 
  )
  console.log(
    '\n', `$array[6] === null`,
    '\n', `${$array[6]} === ${null}`,
    '\n', $array[6] === null, 
  )
  console.log(
    '\n', `$array[7] === undefined`,
    '\n', `${$array[7]} === ${undefined}`,
    '\n', $array[7] === undefined, 
  )
  console.log(
    '\n', "Test #02 | Results", 
    '\n', "Pass", (
      $array[0] === "aaaaaa" &&
      $array[1] === "bbbbbb" &&
      $array[2] === 222222 &&
      $array[3] === 333333 &&
      $array[4] === false &&
      $array[5] === true &&
      $array[6] === null &&
      $array[7] === undefined
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}