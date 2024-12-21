import Test from '../../test/index.js'
import Model from '../../core/model/index.js'
export default function TestResultsModels($tests) {
  const dataPath = [$tests.id].join('.')
  const data = new Model({
    path: dataPath,
    content: $tests,
  })
  const face = new Model({
    path: $tests.id,
    content: {
      pand: "ex",
      collect: new Map(),
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
  ] of Array.from(data.get('collect'))/*.reverse()*/) {
    const testGroupPath = [data.path,  $testGroupID].join('.')
    const testGroup = data.get('collect')
      .set($testGroupID, new Model({
        path: testGroupPath,
        content: $testGroup,
      }))
      .get($testGroupID)
    const testGroupFace = face.get('collect')
      .set($testGroupID, new Model({
        path: testGroupPath,
        content: {
          pand: "ex",
          collect: new Map(),
        }
      }))
      .get($testGroupID)
    let testIndex = 0
    const testResults = {
      pass: 0,
      nonpass: 0,
      sumpass: 0,
    }
    iterateTests: 
    for(const [
      $testID, $testSettings
    ] of Array.from(testGroup.get('collect'))) {
      const testSettings = Object.assign({}, $testSettings, {
        groupID: testGroup.get('id'),
        group: testGroup.get('name'),
      })
      const testPath = [testGroup.path, $testID].join('.')
      const testVerification = new Test($testSettings).execute()
      const test = testGroup.get('collect')
        .set($testID, new Model({
          path: testPath,
          content: {
            collect: testVerification.collect,
            collectName: testVerification.collectName,
            detail: testVerification.detail,
            id: testVerification.id,
            name: testVerification.name,
            pass: testVerification.pass,
            type: testVerification.type,
          },
        }))
        .get($testID)
      // throw "MVC Framework"
      const testFace = testGroupFace.get('collect')
        .set($testID, new Model({
          path: testPath,
          content: {
            pand: "ex",
            collect: new Map()
          }
        }))
        .get($testID)
      const solve = Array.from(Object.values(test.get('detail').solve))
      const testResult = {
        path: testPath,
        pass: solve.reduce(($pass, $solute, $soluteIndex) => {
          if(test.get('detail').quest[$soluteIndex] === $solute) $pass++
          return $pass
        }, 0),
        nonpass: solve.reduce(($nonpass, $solute, $soluteIndex) => {
          if(test.get('detail').quest[$soluteIndex] !== $solute) $nonpass++
          return $nonpass
        }, 0),
        sumpass: solve.length,
      }
      test.set('result', testResult)
      if(test.get('pass') === true) { testResults.pass++ }
      else if(test.get('pass') === false) { testResults.nonpass++ }
      if(testGroup.get('pass') !== false) testGroup.set('pass', test.get('pass'))
      testIndex++
    }
    testResults.sumpass = testIndex
    testGroup.result = testResults
    if(testGroup.pass === true) { testGroupResults.pass++ }
    else if(testGroup.pass === false) { testGroupResults.nonpass++ }
    if(data.get('pass') !== false) data.set('pass', testGroup.get('pass'))
    testGroupIndex++
  }
  testGroupResults.sumpass = testGroupIndex
  data.set('result', testGroupResults)
  return { data, face }
}