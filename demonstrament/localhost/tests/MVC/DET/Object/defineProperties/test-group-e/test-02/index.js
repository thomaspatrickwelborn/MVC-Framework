const objectDefinePropertiesStatementString = `
$object.defineProperties({
  aaa: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: [
      {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {
          ccc: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: [
              {
                configurable: true,
                enumerable: true,
                writable: true,
                value: true,
              },
              {
                configurable: true,
                enumerable: true,
                writable: true,
                value: null,
              },
            ]
          }
        }
      },
      {
        configurable: true,
        enumerable: true,
        writable: true,
        value: [
          {
            configurable: true,
            enumerable: true,
            writable: true,
            value: false,
          },
          {
            configurable: true,
            enumerable: true,
            writable: true,
            value: undefined,
          },
        ]
      },
    ]
  }
})
`
export default function test18($object) {
  console.log(
    "------",
    "\n", "Test Group E. #02 | Define Configurable/Enumerable/Writable Multi-Dimension Mixed Object/Array Properties"
  )
  console.log(objectDefinePropertiesStatementString)
  $object.defineProperties({
    aaa: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: [
        {
          configurable: true,
          enumerable: true,
          writable: true,
          value: {
            ccc: {
              configurable: true,
              enumerable: true,
              writable: true,
              value: [
                {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: true,
                },
                {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: null,
                },
              ]
            }
          }
        },
        {
          configurable: true,
          enumerable: true,
          writable: true,
          value: [
            {
              configurable: true,
              enumerable: true,
              writable: true,
              value: false,
            },
            {
              configurable: true,
              enumerable: true,
              writable: true,
              value: undefined,
            },
          ]
        },
      ]
    }
  })
  console.log($object)
  console.log(
    '\n', `$object.aaa[0].ccc[0] === false`,
    '\n', `${$object.aaa[0].ccc[0]} === {false}`,
    '\n', $object.aaa[0].ccc[0] === true
  )
  console.log(
    '\n', `$object.aaa[0].ccc[1] === undefined`,
    '\n', `${$object.aaa[0].ccc[1]} === ${undefined}`,
    '\n', $object.aaa[0].ccc[1] === null
  )
  console.log(
    '\n', `$object.aaa[1][0] === true`,
    '\n', `${$object.aaa[1][0]} === ${true}`,
    '\n', $object.aaa[1][0] === false
  )
  console.log(
    '\n', `$object.aaa[1][1] === null`,
    '\n', `${$object.aaa[1][1]} === ${null}`,
    '\n', $object.aaa[1][1] === undefined
  )
  console.log(
    '\n', "Test Group E. #02 | Results", 
    '\n', "Pass", (
      $object.aaa[0].ccc[0] === true &&
      $object.aaa[0].ccc[1] === null &&
      $object.aaa[1][0] === false &&
      $object.aaa[1][1] === undefined
    ),
    '\n', 'Parse Object', 
    '\n', $object.parse({ type: 'object' }),
    '\n', 'Parse JSON', 
    '\n', $object.parse({ type: 'json' }),
  )
}