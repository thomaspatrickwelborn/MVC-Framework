import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../coutil/index.js'
export default function objectAssign() {
  const object = new DET({
    aaa: {
      bbb: {
        ccc: {
          ddd: 777
        }
      }
    }
  })
  object.aaa.bbb.addEventListener('assign', eventLog)
  object.addEventListener('assign', eventLog)
  object.assign({
    aaa: {
      bbb: {
        ccc: {
          ddd: 444444
        }
      }
    }
  })
  object.assign({
    aaa: {
      bbb: {
        ccc: {
          eee: {
            fff: 666
          }
        }
      }
    }
  })
  object.aaa.bbb.ccc.eee. addEventListener('assign', eventLog)
  object.assign({
    aaa: {
      bbb: {
        ccc: {
          eee: {
            fff: 66666666
          }
        }
      }
    }
  })
}