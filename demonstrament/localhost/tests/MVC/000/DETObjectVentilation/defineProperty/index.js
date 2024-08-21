import { DET } from '/dependencies/mvc-framework.js'
import { eventLog } from '../../coutil/index.js'
export default function objectDefineProperty() {
  const object = new DET({/*{
    aaa: {
      bbb: {
        ccc: {
          ddd: 777
        }
      }
    }
  }*/})
  object.addEventListener(
    'defineProperty', 
    eventLog,
  )
  object.defineProperty(
    'aaa', 
    {
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
    }
  )
  console.log('object', object)
  /*
  const object = new DET({})
  object.addEventListener(
    'defineProperties',
    objectDefineProperty
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