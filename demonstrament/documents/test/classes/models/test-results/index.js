import Test from '../../test/index.js'
function Face($face) {
  let { pand, path } = $face
  const face = Object.defineProperties({}, {
    location: { value: window.location.pathname, enumerable: false, writable: false },
    parse: { value: function parse() {
      return Object.entries(
        Object.getOwnPropertyDescriptors(this)
      ).reduce(($parse, [
        $propertyDescriptorName, $propertyDescriptor
      ]) => {
        if($propertyDescriptor.enumerable === true) {
          $parse[$propertyDescriptorName] = this[$propertyDescriptorName]
        }
        return $parse
      }, {})
    }, enumerable: false, writable: false }, 
    read: { value: function read() {
      return JSON.parse(localStorage.getItem(this.path))
    }, enumerable: false, writable: false },
    load: { value: function load() {
      Object.assign(this, this.read())
      return this
    }, enumerable: false, writable: false },
    save: { value: function save() {
      localStorage.setItem(this.path, JSON.stringify(this.parse()))
      return this
    }, enumerable: false, writable: false },
    remove: { value: function remove() {
      localStorage.removeItem(this.path)
      return this
    } },
    _path: { value: path, enumerable: false, writable: true },
    _pand: { value: pand, enumerable: false, writable: true },
    collect: { value: new Map(), enumerable: false, writable: false },
    path: {
      get() {
        if(this._path !== undefined) return this._path
        this._path = [window.location.pathname, path].join('')
        return this._path
      }, enumerable: false },
    pand: {
      get() { return this._pand },
      set($pand) {
        this._pand = $pand
        this.save()
      },
      enumerable: true,
    },
  })
  return face.save()
}
export default function TestResultsModels($tests) {
  const data = $tests
  const dataPath = data.id
  data.path = dataPath
  const face = Face({
    path: dataPath,
    pand: "ex",
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
      .set($testGroupID, Face({
        path: testGroupPath,
        pand: "ex",
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
        .set($testID, Face({
          path: testPath,
          pand: "ex",
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