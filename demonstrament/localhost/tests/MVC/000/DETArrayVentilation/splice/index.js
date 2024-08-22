import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayPush() {
  let array = new DET([
    ['Jan', 'March', 'April', 'June'], 
    ["parrot", "anemone", "blue", "trumpet", "sturgeon"],
    ["angel", "clown", "mandarin", "sturgeon"],
  ])
  array.addEventListener('spliceDelete', eventLog)
  array.addEventListener('spliceAdd', eventLog)
  array.addEventListener('splice', eventLog)

  array[0].splice(1, 0, 'Feb')
  array[1].splice(2, 0, "drum", "guitar");
  array[2].splice(2)
}