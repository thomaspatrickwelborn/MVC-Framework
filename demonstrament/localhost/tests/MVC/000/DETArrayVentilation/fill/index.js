import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function arrayFill() {
  let array = new DET([
    [], [], [],
  ])
  array.addEventListener('lengthSet', eventLog)
  array[0].length = 7
  array[1].length = 5
  array[2].length = 3
  array.addEventListener('fillIndex', eventLog)
  array.addEventListener('fill', eventLog)
  array[0].fill('aaa', array[0])
  array[1].fill('aaa', array[1])
  array[2].fill('aaa', array[2])
  console.log(array)
}