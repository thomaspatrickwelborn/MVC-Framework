import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayPush() {
  let array = new DET([
    [], [], [],
  ])
  array.addEventListener('push', eventLog)
  array.addEventListener('pushProp', eventLog)
  array[0].push(111,222,333,444,555,666,777)
  array[1].push(888,999,111,222,333)
  array[2].push(444,555,666)
}