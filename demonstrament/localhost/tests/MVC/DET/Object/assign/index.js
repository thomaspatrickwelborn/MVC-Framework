import testGroupA from './test-group-a/index.js'
import testGroupB from './test-group-b/index.js'
import testGroupC from './test-group-c/index.js'
import testGroupD from './test-group-d/index.js'
import testGroupE from './test-group-e/index.js'
function DOMContentLoaded() {
  console.log("Object Assign Tests")
  testGroupA()
  testGroupB()
  testGroupC()
  testGroupD()
  testGroupE()
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)