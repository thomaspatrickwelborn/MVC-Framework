import { DETEventLog } from '../Coutil/index.js'
import { DET } from '/dependencies/mvc-framework.js'

function DOMContentLoaded() {
  // const object = new DET({
  //   aaa: 111,
  //   bbb: 222,
  //   ccc: {
  //     ddd: 444,
  //     eee: 555,
  //     fff: [
  //       777, 888, [{
  //         zzz: [999, 888, 777]
  //       }]
  //     ]
  //   }
  // })
  const object = new DET({
    aaa: {
      bbb: 222,
    }, 
  })
  // object.aaa.addEventListener('set', DETEventLog)
  object.addEventListener('set', DETEventLog)
  object.aaa.bbb = 222222
  // object.ccc = 3456
  // object.addEventListener('assign', DETEventLog)
  // object.aaa.assign({
  //   bbb: 111
  // })
  // object.assign({
  //   aaa: {
  //     bbb: 111111
  //   }
  // })
  // const array = new DET([])
  // array.addEventListener('lengthSet', DETEventLog)
  // array.length = 3
  // console.log(object)
  // console.log('object.aaa', object.aaa)
  // console.log('object', object)
  // const array = new DET([
  //   [0, 1, 2], [3, 4, 5]
  // ])
  // array[0][2] = 222
  // console.log('array[0][2]', array[0][2])
  // console.log('array', array)
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)

// /graphics/photos