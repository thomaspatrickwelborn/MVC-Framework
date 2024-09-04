import test_a from './test-a/index.js'
// import test_b from './test-b/index.js'
// import test_c from './test-c/index.js'
// import test_d from './test-d/index.js'
// import test_e from './test-e/index.js'

export default function hypothesis() {
  return {
    type: 'hypothesis',
    title: "DET Object Assign",
    tests: [
      test_a(),
      // test_b(),
      // test_c(),
      // test_d(),
      // test_e(),
    ]
  }
}