export default function proof_01($object) {
  $object.assign({
    aaa: 111,
    bbb: true,
    ccc: "333",
    ddd: false,
    eee: null,
  })
  return {
    name: "Proof 1 | Assign Mono-Dimension Object Properties.",
    description: "", 
    preconditions: {
      content: [
        {
          name: "Precondition 1.",
          description: "Assign object properties of different datatypes."
          statement: [
            '$object.assign({',
            '  aaa: 111,',
            '  bbb: true,',
            '  ccc: "333",',
            '  ddd: false,',
            '  eee: null,',
            '})',
          ]
        }
      ]
    },
    arguments: {
      content: [
        {
          name: "Argument #1",
          claim: `$object.aaa === 111`,
          premise: `${$object.aaa} === ${111}`,
          inference: ($object.aaa === 111),
        },
        {
          name: "Argument #2",
          claim: `$object.bbb === true`, 
          premise: `${$object.bbb} === ${true}`, 
          inference: $object.bbb === true,
        },
        {
          name: "Argument #3",
          claim: `$object.ccc === "333"`,
          premise: `${$object.ccc} === "${333}"`,
          inference: $object.ccc === "333",
        },
        {
          name: "Argument #4",
          claim: `$object.ddd === false`, 
          premise: `${$object.ddd} === ${false}`, 
          inference: $object.ddd === false, 
        },
        {
          name: "Argument #5",
          claim: `$object.eee === null`, 
          premise: `${$object.eee} === ${null}`, 
          inference: $object.eee === null,
        },
      ]
    },
    conclusions: {
      name: "Conclusions",
      content: [
        {
          name: "Proof 1. Conclusions",
          postconditions: [
            {
              name: "Postcondition 1.A. - Parse Object", 
              statement: $object.parse({ type: "object" }),
            },
            {
              name: "Postcondition 1.B. - Parse JSON", 
              statement: $object.parse({ type: "json" }),
            },
          ],
        }
    ]
  }
}