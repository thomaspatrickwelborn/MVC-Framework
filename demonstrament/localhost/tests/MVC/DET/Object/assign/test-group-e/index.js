import { DET } from '/dependencies/mvc-framework.js'
import test01 from './test-01/index.js'
import test02 from './test-02/index.js'
import test03 from './test-03/index.js'
import test04 from './test-04/index.js'
export default function testGroupE() {
  console.log("Assign Multi-Dimension Mixed Object/Array Properties")
  console.log(`const object = new DET({})`)
  const array = new DET([])
  test01(array)
  test02(array)
  test03(array)
  test04(array)
}