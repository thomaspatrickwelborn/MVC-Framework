import { DET } from '/dependencies/mvc-framework.js'
import test01 from './test-01/index.js'
import test02 from './test-02/index.js'
import test03 from './test-03/index.js'
import test04 from './test-04/index.js'
export default function testGroupE() {
  console.log("Test Group E.")
  console.log("Define Enumerable/Configurable/Writable Multi-Dimension Mixed Object/Array Properties")
  console.log(`const object = new DET({})`)
  const object = new DET([])
  test01(object)
  const object2 = new DET([])
  test02(object2)
  test03(object2)
  test04(object2)
}