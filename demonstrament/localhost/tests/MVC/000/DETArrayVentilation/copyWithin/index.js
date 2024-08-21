import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayCopyWithin() {
  let array = new DET([
    'aaa', 222, false, {
      eee: "fff",
      ggg: 777,
      hhh: true
    }, [
      "iii", 101, false, 
      undefined, undefined, undefined
    ],
    "lll", 141, true,
    undefined, undefined, undefined
  ])
  array.addEventListener('copyWithinIndex', eventLog)
  array.addEventListener('copyWithin', eventLog)
  array[4].copyWithin(3, 0, 3)
  console.log(array)
}