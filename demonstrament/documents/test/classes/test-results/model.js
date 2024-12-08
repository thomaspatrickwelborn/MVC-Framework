import Test from './test/index.js'
export default function Model($model) {
  let testGroupsPass
  const model = $model
  iterateTestGroups: 
  for(const [
    $testGroupID, $testGroup
  ] of Array.from(model.groups).reverse()) {
    const testGroup = model.groups
      .set($testGroupID, $testGroup)
      .get($testGroupID)
    const { tests } = testGroup
    let testGroupPass
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
      if(testGroupPass !== false) testGroupPass = test.pass
    }
    testGroup.pass = testGroupPass
    if(testGroupsPass !== false) testGroupsPass = testGroup.pass
  }
  model.pass = testGroupsPass
  return model
}