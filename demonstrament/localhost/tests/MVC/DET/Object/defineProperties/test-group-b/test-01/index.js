const objectAssignStatementString = `
$object.assign({
  aaa: {
    bbb: {
      ccc: {
        ddd: true,
        eee: null,
      },
    },
    fff: {
      ggg: false,
      hhh: undefined
    }
  }
})
`
export default function test05($object) {
  console.log(
    "-----", 
    "\n", "Test #05 | Define Initial Multi-Dimension Object Properties",
  )
  console.log(objectAssignStatementString)
  $object.assign({
    aaa: {
      bbb: {
        ccc: {
          ddd: true,
          eee: null,
        },
      },
      fff: {
        ggg: false,
        hhh: undefined
      }
    }
  })
  console.log(
    '\n', `$object.aaa.bbb.ccc.ddd === true`,
    '\n', `${$object.aaa.bbb.ccc.ddd} === ${true}}`,
    '\n', $object.aaa.bbb.ccc.ddd === true,
  )
  console.log(
    '\n', `$object.aaa.bbb.ccc.eee === null`,
    '\n', `${$object.aaa.bbb.ccc.eee} === ${null}}`,
    '\n', $object.aaa.bbb.ccc.eee === null,
  )
  console.log(
    '\n', `$object.aaa.fff.ggg === false`,
    '\n', `${$object.aaa.fff.ggg} === ${false}}`,
    '\n', $object.aaa.fff.ggg === false,
  )
  console.log(
    '\n', `$object.aaa.fff.hhh === undefined`,
    '\n', `${$object.aaa.fff.hhh} === ${undefined}}`,
    '\n', $object.aaa.fff.hhh === undefined,
  )
  console.log(
    '\n', "Test #05 | Results",
    '\n', (
      $object.aaa.bbb.ccc.ddd === true &&
      $object.aaa.bbb.ccc.eee === null &&
      $object.aaa.fff.ggg === false &&
      $object.aaa.fff.hhh === undefined
    ),
    '\n', 'Parse Object',
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON',
    '\n', $object.parse({ type: 'json' }),
  )
}