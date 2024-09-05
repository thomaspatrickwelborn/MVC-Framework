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
      [
        '$object.assign({',
        '  aaa: 111,',
        '  bbb: true,',
        '  ccc: "333",',
        '  ddd: false,',
        '  eee: null,',
        '})',
      ],
    ],
    arguments: [
      {
        claim: `$object.aaa === 111`,
        premise: `${$object.aaa} === ${111}`,
        inference: ($object.aaa === 111),
      },
      {
        claim: `$object.bbb === true`, 
        premise: `${$object.bbb} === ${true}`, 
        inference: $object.bbb === true,
      },
      {
        claim: `$object.ccc === "333"`,
        premise: `${$object.ccc} === "${333}"`,
        inference: $object.ccc === "333",
      },
      {
        claim: `$object.ddd === false`, 
        premise: `${$object.ddd} === ${false}`, 
        inference: $object.ddd === false, 
      },
      {
        claim: `$object.eee === null`, 
        premise: `${$object.eee} === ${null}`, 
        inference: $object.eee === null,
      },
    ],
    conclusion: [
      {
        label: "PASS",
        hiddenAssumptions: [
          {
            label: "Parse Object", 
            premise: $object.parse({ type: "object" }),
          },
          {
            label: "Parse JSON", 
            premise: $object.parse({ type: "json" }),
          },
        ]
      }
    ]
  }
}