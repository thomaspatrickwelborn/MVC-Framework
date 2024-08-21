import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayUnshift() {
  let array = new DET([
    [111,222,333,444,555,666,777], [111,222,333,444,555], [111,222,333],
  ])
  array.addEventListener('shift', eventLog)

  array[0].shift()
  array[1].shift()
  array[2].shift()

  array[0].shift()
  array[1].shift()
  array[2].shift()

  array[0].shift()
  array[1].shift()
  array[2].shift()
  
  console.log(array)
}