import { DET } from '/dependencies/mvc-framework.js'
import test01 from './test-01/index.js'
import test02 from './test-02/index.js'
import test03 from './test-03/index.js'
import test04 from './test-04/index.js'
export default function testGroupC() {
  console.log("Test Group C.")
  console.log("Define Mono-Dimension Array Properties")
  console.log(`const array = new DET([])`)
  const array = new DET([])
  test01(array)
  const array2 = new DET([])
  test02(array2)
  test03(array2)
  test04(array2)
}