export default function proof_01($object) {
  $object.assign({
    aaa: 111,
    bbb: true,
    ccc: "333",
    ddd: false,
    eee: null,
  })
  return {
    type: "proof",
    title: "Proof 1.",
    description: "Assign Mono-Dimension Object Properties", 
    preconditions: [
      {
        type: "precondition",
        title: "Precondition 1.",
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
    ],
    arguments: [
      {
        type: 'argument',
        claim: `$object.aaa === 111`,
        premise: `${$object.aaa} === ${111}`,
        inference: ($object.aaa === 111),
      },
      {
        type: 'argument',
        claim: `$object.bbb === true`, 
        premise: `${$object.bbb} === ${true}`, 
        inference: $object.bbb === true,
      },
      {
        type: 'argument',
        claim: `$object.ccc === "333"`,
        premise: `${$object.ccc} === "${333}"`,
        inference: $object.ccc === "333",
      },
      {
        type: 'argument',
        claim: `$object.ddd === false`, 
        premise: `${$object.ddd} === ${false}`, 
        inference: $object.ddd === false, 
      },
      {
        type: 'argument',
        claim: `$object.eee === null`, 
        premise: `${$object.eee} === ${null}`, 
        inference: $object.eee === null,
      },
    ],
    conclusions: [
      {
        type: "conclusion",
        title: "Proof 1. Conclusions",
        label: "PASS",
        postconditions: [
          {
            type: "postcondition",
            label: "Postcondition 1.A. - Parse Object", 
            statement: $object.parse({ type: "object" }),
          },
          {
            type: "postcondition",
            label: "Postcondition 1.B. - Parse JSON", 
            statement: $object.parse({ type: "json" }),
          },
        ],
      }
    ]
  }
}