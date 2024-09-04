const objectDefinePropertiesStatementString = `
$object.defineProperties({
  aaa: {
    value: {
      bbb: {
        value: {
          ccc: {
            value: {
              ddd: {
                value: true
              },
              eee: {
                value: null
              },
            },
          },
        },
      },
      fff: {
        value: {
          ggg: {
            value: false
          },
          hhh: {
            value: undefined
          },
        }
      }
    }
  }
})
`
export default function test01($object) {
  console.log(
    "-----", 
    "\n", "Test Group B. #01 | Define Default Multi-Dimension Object Properties",
  )
  console.log(objectDefinePropertiesStatementString)
  $object.defineProperties({
    aaa: {
      value: {
        bbb: {
          value: {
            ccc: {
              value: {
                ddd: {
                  value: true
                },
                eee: {
                  value: null
                },
              },
            },
          },
        },
        fff: {
          value: {
            ggg: {
              value: false
            },
            hhh: {
              value: undefined
            },
          }
        }
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
    '\n', "Test #01 | Results",
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