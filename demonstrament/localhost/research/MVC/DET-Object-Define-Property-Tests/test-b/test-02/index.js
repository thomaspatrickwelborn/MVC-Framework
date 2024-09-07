const objectDefinePropertiesStatementString = `
$object.defineProperties({
  aaa: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      bbb: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {
          ccc: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: {
              ddd: {
                configurable: true,
                enumerable: true,
                writable: true,
                value: true
              },
              eee: {
                configurable: true,
                enumerable: true,
                writable: true,
                value: null
              },
            },
          },
        },
      },
      fff: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {
          ggg: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: false
          },
          hhh: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: undefined
          },
        }
      }
    }
  }
})
`
export default function test02($object) {
  console.log(
    "-----", 
    "\n", "Test Group B. #02 | Define Configurable/Enumerable/Writable Multi-Dimension Object Properties",
  )
  console.log(objectDefinePropertiesStatementString)
  $object.defineProperties({
    aaa: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        bbb: {
          configurable: true,
          enumerable: true,
          writable: true,
          value: {
            ccc: {
              configurable: true,
              enumerable: true,
              writable: true,
              value: {
                ddd: {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: true
                },
                eee: {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: null
                },
              },
            },
          },
        },
        fff: {
          configurable: true,
          enumerable: true,
          writable: true,
          value: {
            ggg: {
              configurable: true,
              enumerable: true,
              writable: true,
              value: false
            },
            hhh: {
              configurable: true,
              enumerable: true,
              writable: true,
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
    '\n', "Test #02 | Results",
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