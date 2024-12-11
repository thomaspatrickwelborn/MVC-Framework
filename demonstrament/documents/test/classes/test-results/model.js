import Test from './test/index.js'
export default function Model($model) {
  const model = $model
  let testGroupIndex = 0
  const testGroupResults = {
    result: undefined,
    pass: 0,
    nonpass: 0,
    sumpass: 0,
  }
  iterateTestGroups: 
  for(const [
    $testGroupID, $testGroup
  ] of Array.from(model.groups).reverse()) {
    const testGroup = model.groups
      .set($testGroupID, $testGroup)
      .get($testGroupID)
    const { tests } = testGroup
    let testIndex = 0
    const testResults = {
      result: undefined,
      pass: 0,
      nonpass: 0,
      sumpass: 0,
    }
    iterateTests: 
    for(const [
      $testID, $testSettings
    ] of Array.from(tests).reverse()) {
      const testSettings = Object.assign({}, $testSettings, {
        groupID: testGroup.id,
        group: testGroup.name,
      })
      const test = tests
        .set($testID, new Test($testSettings).execute())
        .get($testID)
      if(test.pass === true) { testResults.pass++ }
      else if(test.pass === false) { testResults.nonpass++ }
      if(testResults.result !== false) testResults.result = test.pass
      testIndex++
    }
    testGroup.sumpass = testIndex
    testGroup.pass = testResults
    if(testGroup.pass.result === true) { testGroupResults.pass++ }
    else if(testGroup.pass.result === false) { testGroupResults.nonpass++ }
    if(testGroupResults.result !== false) testGroupResults.result = testGroup.pass.result
    testGroupIndex++
  }
  testGroupResults.sumpass = testGroupIndex
  model.pass = testGroupResults
  console.log("model", model)
  return model
}