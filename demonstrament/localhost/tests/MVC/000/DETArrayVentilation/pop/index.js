import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayPop() {
  let array = new DET([
    [111,222,333,444,555,666,777], [111,222,333,444,555], [111,222,333],
  ])
  array.addEventListener('pop', eventLog)
  array[0].pop()
  array[1].pop()
  array[2].pop()
  console.log(array)
}