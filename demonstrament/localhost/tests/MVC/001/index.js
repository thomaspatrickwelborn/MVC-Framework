import { DET } from '/dependencies/mvc-framework.js'
import logEvent from './logEvent.js'
function DOMContentLoaded() {
  console.log('-----')
  const object = new DET({
    aaa: 111,
    bbb: 222,
    ccc: {
      ddd: 444,
      eee: 555,
      fff: {
        ggg: 777
      }
    }
  })
  console.log(object.parse())
  object.addEventListener('assign', logEvent)
  // object.addEventListener('assignSource', logEvent)
  // object.addEventListener('assignSourceProperty', logEvent)
  object.assign({
    ccc: {
      fff: {
        ggg: 777777,
        hhh: {
          iii: 999
        }
      }
    }
  })
  // console.log('-----')
  // object.assign({
  //   ccc: {
  //     fff: {
  //       hhh: {
  //         iii: 999999
  //       }
  //     }
  //   }
  // })
}

document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)