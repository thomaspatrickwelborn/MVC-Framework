import { DET } from '/dependencies/mvc-framework.js'
import proof_01 from './proof-01/index.js'
// import proof_02 from './proof-02/index.js'
// import proof_03 from './proof-03/index.js'
// import proof_04 from './proof-04/index.js'
export default function test_a($object) {
  const object = new DET({})
  return {
    type: "test",
    title: "Test A.",
    description: "Assign Mono-Dimension Non-Object/Non-Array Properties",
    proofs: [
      proof_01(object),
      // proof_02(object),
      // proof_03(object),
      // proof_04(object)
    ]
  }
}
