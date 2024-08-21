import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function objectSeal() {
  const object = new DET({
    aaa: {
      bbb: {
        ccc: {
          ddd: 777
        }
      }
    }
  })
  object.addEventListener('seal', eventLog)
  object.seal()
}