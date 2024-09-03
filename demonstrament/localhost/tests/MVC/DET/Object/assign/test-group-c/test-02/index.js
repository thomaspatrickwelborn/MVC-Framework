const arrayAssignStatementString = `
$array.assign([
  "aaa",
  "bbb",
  222,
  333,
  true,
  false,
  undefined,
  null
])
`
export default function test10($array) {
  console.log(
    "------",
    "\n", "Test Group C. #02 | Ressign Mono-Dimension Array Properties"
  )
  console.log(arrayAssignStatementString)
  $array.assign([
    "aaaaaa",
    "bbbbbb",
    222222,
    333333,
    false,
    true,
    null,
    undefined,
  ])
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
    '\n', "Test Group C. #02 | Results", 
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