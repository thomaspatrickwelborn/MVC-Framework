import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayPush() {
  let array = new DET([
    [], [], [],
  ])
  array.addEventListener('unshift', eventLog)
  array.addEventListener('unshiftProp', eventLog)
  array[0].unshift(111,222,333,444,555,666,777)
  array[1].unshift(888,999,111,222,333)
  array[2].unshift(444,555,666)
}