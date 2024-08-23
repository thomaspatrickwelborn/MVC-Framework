import { DET } from '/dependencies/mvc-framework.js'
import { DETEventLog } from '../../../Coutil/index.js'
export default function objectAssignDemonstration() {
  console.log(
    '\n', '-----',
    '\n', 'Instantiation',
  )
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
  console.log(
    '\n', '-----',
    '\n', 'Parsement',
  )
  console.log(object.parse())
  console.log(object.parse({ type: 'JSON' }))
  console.log(
    '\n', '-----',
    '\n', 'Add Event Listener - Base Object',
  )
  object.addEventListener('assign', DETEventLog)
  object.assign({
    aaa: 111111
  })
  object.assign({
    ccc: {
      ddd: 444444
    }
  })
  object.removeEventListener("assign", DETEventLog)
  console.log(
    '\n', '-----',
    '\n', 'Add Event Listener - Subbase Object',
  )
  object.ccc.addEventListener("assign", DETEventLog)
  object.ccc.assign({
    ddd: 444444444
  })
  object.ccc.fff.assign({
    ggg: 777777
  })
  object.ccc.removeEventListener("assign", DETEventLog)
  console.log(
    '\n', '-----',
    '\n', '"assignSourceProperty" Event',
  )
  object.addEventListener("assignSourceProperty", DETEventLog)
  object.assign({
    aaa: 111,
  })
  console.log('\n', '-----')
  object.assign({
    ccc: {
      eee: 555
    }
  })
  object.removeEventListener("assignSourceProperty", DETEventLog)
  console.log('\n', '-----')
  object.ccc.addEventListener("assignSourceProperty", DETEventLog)
  object.ccc.assign({
    eee: 555
  })
}