import Test from '../../test/index.js'
import Model from '../../core/model/index.js'
export default function TestResultsModels($tests) {
  const dataPath = [$tests.id, 'data'].join('/')
  const data = new Model({
    autosave: false,
    autoload: false,
    path: dataPath,
    content: $tests,
  })
  const facePath = [$tests.id, 'face'].join('/')
  const face = new Model({
    autosave: true,
    autoload: true,
    path: facePath,
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
    const testGroupPath = [data.path,  $testGroupID, 'data'].join('/')
    const testGroup = data.get('collect')
      .set($testGroupID, new Model({
        autosave: false,
        autoload: false,
        path: testGroupPath,
        content: $testGroup,
      }))
      .get($testGroupID)
    const testGroupFacePath = [data.path,  $testGroupID, 'face'].join('/')
    const testGroupFace = face.get('collect')
      .set($testGroupID, new Model({
        autosave: true,
        autoload: true,
        path: testGroupFacePath,
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
      const testPath = [testGroup.path, $testID, 'data'].join('/')
      const testVerification = new Test($testSettings).execute()
      const test = testGroup.get('collect')
        .set($testID, new Model({
          autosave: false,
          autoload: false,
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
      const testFacePath = [testGroup.path, $testID, 'face'].join('/')
      const testFace = testGroupFace.get('collect')
        .set($testID, new Model({
          path: testFacePath,
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
    testGroup.set('result', testResults)
    if(testGroup.get('pass') === true) { testGroupResults.pass++ }
    else if(testGroup.get('pass') === false) { testGroupResults.nonpass++ }
    if(data.get('pass') !== false) data.set('pass', testGroup.get('pass'))
    testGroupIndex++
  }
  testGroupResults.sumpass = testGroupIndex
  data.set('result', testGroupResults)
  return { data, face }
}