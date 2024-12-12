import Test from '../test/index.js'
export default function TestResultsModel($model) {
  const model = $model
  let testGroupIndex = 0
  const testGroupResults = {
    // path: $model.id,
    pass: 0,
    nonpass: 0,
    sumpass: 0,
  }
  iterateTestGroups: 
  for(const [
    $testGroupID, $testGroup
  ] of Array.from(model.collect).reverse()) {
    const testGroup = model.collect
      .set($testGroupID, $testGroup)
      .get($testGroupID)
    let testIndex = 0
    const testResults = {
      path: [/*$model.id, */ $testGroupID].join('/'),
      pass: 0,
      nonpass: 0,
      sumpass: 0,
    }
    // iterateTests: 
    for(const [
      $testID, $testSettings
    ] of Array.from(testGroup.collect).reverse()) {
      const testSettings = Object.assign({}, $testSettings, {
        groupID: testGroup.id,
        group: testGroup.name,
      })
      const test = testGroup.collect
        .set($testID, new Test($testSettings).execute())
        .get($testID)
      const testResult = {
        path: [/*$model.id, */ $testGroupID, $testID].join('/'),
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
    if(model.pass !== false) model.pass = testGroup.pass
    testGroupIndex++
  }
  testGroupResults.sumpass = testGroupIndex
  model.result = testGroupResults
  console.log("model", model)
  return model
}