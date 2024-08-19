import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../coutil/index.js'
export default function objectDefineProperties() {
  const object = new DET({
    aaa: {
      bbb: {
        ccc: {
          ddd: 777
        }
      }
    }
  })
  object.addEventListener(
    'defineProperties', 
    eventLog,
  )
  object.addEventListener(
    'defineProperty', 
    eventLog,
  )
  object.defineProperties({
    aaa: {
      value: {
        bbb: {
          value: {
            ccc: {
              value: {
                ddd: {
                  value: 777777
                }
              }
            }
          }
        }
      },
    },
  })
  /*
  const object = new DET({})
  object.addEventListener(
    'defineProperties',
    objectDefineProperties
  )
  object.defineProperties({
    aaa: {
      value: {
        bbb: {
          value: {
            ccc: {
              value: {
                ddd: {
                  value: 777777
                }
              }
            }
          }
        }
      },
    },
  })
  */
}