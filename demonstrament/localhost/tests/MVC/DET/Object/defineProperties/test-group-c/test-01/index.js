const arrayAssignStatementString = `
$array.defineProperties({
  0: { value: "aaa" }
  1: { value: "bbb" },
  2: { value: 222 },
  3: { value: 333 },
  4: { value: true },
  5: { value: false },
  6: { value: undefined },
  7: { value: null },
})
`
export default function test09($array) {
  console.log(
    "------",
    "\n", "Test Group C. #01 | Define Default Mono-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  $array.defineProperties({
    0: { value: "aaa" },
    1: { value: "bbb" },
    2: { value: 222 },
    3: { value: 333 },
    4: { value: true },
    5: { value: false },
    6: { value: undefined },
    7: { value: null },
  })
  console.log(
    '\n', `$array[0] === "aaa"`,
    '\n', `${$array[0]} === ${"aaa"}`,
    '\n', $array[0] === "aaa", 
  )
  console.log(
    '\n', `$array[1] === "bbb"`,
    '\n', `${$array[1]} === ${"bbb"}`,
    '\n', $array[1] === "bbb", 
  )
  console.log(
    '\n', `$array[2] === 222`,
    '\n', `${$array[2]} === ${222}`,
    '\n', $array[2] === 222, 
  )
  console.log(
    '\n', `$array[3] === 333`,
    '\n', `${$array[3]} === ${333}`,
    '\n', $array[3] === 333, 
  )
  console.log(
    '\n', `$array[4] === true`,
    '\n', `${$array[4]} === ${true}`,
    '\n', $array[4] === true, 
  )
  console.log(
    '\n', `$array[5] === false`,
    '\n', `${$array[5]} === ${false}`,
    '\n', $array[5] === false, 
  )
  console.log(
    '\n', `$array[6] === undefined`,
    '\n', `${$array[6]} === ${undefined}`,
    '\n', $array[6] === undefined, 
  )
  console.log(
    '\n', `$array[7] === null`,
    '\n', `${$array[7]} === ${null}`,
    '\n', $array[7] === null, 
  )
  console.log(
    '\n', "Test Group C. #01 | Results", 
    '\n', "Pass", (
      $array[0] === "aaa",
      $array[1] === "bbb",
      $array[2] === 222,
      $array[3] === 333,
      $array[4] === true,
      $array[5] === false,
      $array[6] === undefined,
      $array[7] === null
    ),
    '\n', 'Parse Object', 
    '\n', $array.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $array.parse({ type: 'json' }),
  )
}