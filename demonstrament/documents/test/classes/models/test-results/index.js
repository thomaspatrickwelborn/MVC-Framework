import Test from '../../test/index.js'
import TestResultsFace from '../test-results-face/index.js'
// import Model from '../../core/model/index.js'
export default function TestResultsModels($tests) {
  const data = $tests
  const dataPath = data.id
  data.path = dataPath
  const face = new TestResultsFace({
    content: {
      path: dataPath,
      pand: "ex",
    }
  })
  let testGroupIndex = 0
  const testGroupResults = {
    // path: data.id,
    pass: 0,
    nonpass: 0,
    sumpass: 0,
  }
  iterateTestGroups: 
  for(const [
    $testGroupID, $testGroup
  ] of Array.from(data.collect)/*.reverse()*/) {
    const testGroup = data.collect
      .set($testGroupID, $testGroup)
      .get($testGroupID)
    const testGroupPath = [dataPath,  $testGroupID].join('.')
    testGroup.path = testGroupPath
    const testGroupFace = face.collect
      .set($testGroupID, new TestResultsFace({
        path: testGroupPath,
        content: {
          pand: "ex",
        }
      }))
      .get($testGroupID)
    let testIndex = 0
    const testResults = {
      pass: 0,
      nonpass: 0,
      sumpass: 0,
    }
    // iterateTests: 
    for(const [
      $testID, $testSettings
    ] of Array.from(testGroup.collect)/*.reverse()*/) {
      const testSettings = Object.assign({}, $testSettings, {
        groupID: testGroup.id,
        group: testGroup.name,
      })
      const test = testGroup.collect
        .set($testID, new Test($testSettings).execute())
        .get($testID)
      const testPath = [testGroupPath, $testID].join('.')
      test.path = testPath
      const testFace = testGroupFace.collect
        .set($testID, new TestResultsFace({
          content: {
            path: testPath,
            pand: "ex",
          }
        }))
        .get($testID)
      const testResult = {
        path: testPath,
        pass: test.detail.solve.reduce(($pass, $solute, $soluteIndex) => {
          if(test.detail.quest[$soluteIndex] === $solute) $pass++
          return $pass
        }, 0),
        nonpass: test.detail.solve.reduce(($nonpass, $solute, $soluteIndex) => {
          if(test.detail.quest[$soluteIndex] !== $solute) $nonpass++
          return $nonpass
        }, 0),
        sumpass: test.detail.solve.length,
      }
      test.result = testResult
      if(test.pass === true) { testResults.pass++ }
      else if(test.pass === false) { testResults.nonpass++ }
      if(testGroup.pass !== false) testGroup.pass = test.pass
      testIndex++
    }
    testResults.sumpass = testIndex
    testGroup.result = testResults
    if(testGroup.pass === true) { testGroupResults.pass++ }
    else if(testGroup.pass === false) { testGroupResults.nonpass++ }
    if(data.pass !== false) data.pass = testGroup.pass
    testGroupIndex++
  }
  testGroupResults.sumpass = testGroupIndex
  data.result = testGroupResults
  return { data, face }
}