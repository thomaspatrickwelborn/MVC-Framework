const objectAssignStatement = `
$object.assign({
  aaa: {
    bbb: {
      ccc: {
        ddd: false,
        eee: undefined,
      },
    },
  },
})
`
export default function test06($object) {
  console.log(
    "-----", 
    "\n", "Test #06 | Reassign Multi-Dimension Object Properties",
  )
  console.log(objectAssignStatement)
  $object.assign({
    aaa: {
      bbb: {
        ccc: {
          ddd: false,
          eee: undefined,
        },
      },
    },
  })
  $object.aaa.fff.assign({
    ggg: true,
    hhh: null,
  })
  console.log(
    '\n', `$object.aaa.bbb.ccc.ddd === false`,
    '\n', `${$object.aaa.bbb.ccc.ddd} === ${false}}`,
    '\n', $object.aaa.bbb.ccc.ddd === false,
  )
  console.log(
    '\n', `$object.aaa.bbb.ccc.eee === undefined`,
    '\n', `${$object.aaa.bbb.ccc.eee} === ${undefined}}`,
    '\n', $object.aaa.bbb.ccc.eee === undefined,
  )
  console.log(
    '\n', `$object.aaa.fff.ggg === true`,
    '\n', `${$object.aaa.fff.ggg} === ${true}}`,
    '\n', $object.aaa.fff.ggg === true,
  )
  console.log(
    '\n', `$object.aaa.fff.hhh === null`,
    '\n', `${$object.aaa.fff.hhh} === ${null}}`,
    '\n', $object.aaa.fff.hhh === null,
  )
  console.log(
    '\n', "Test #06 | Results",
    '\n', (
      $object.aaa.bbb.ccc.ddd === false &&
      $object.aaa.bbb.ccc.eee === undefined &&
      $object.aaa.fff.ggg === true &&
      $object.aaa.fff.hhh === null
    ),
    '\n', 'Parse Object',
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON',
    '\n', $object.parse({ type: 'json' }),
  )
}