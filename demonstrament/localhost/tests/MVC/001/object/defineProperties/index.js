import { DET } from '/dependencies/mvc-framework.js'
import { DETEventLog } from '../../../Coutil/index.js'
export default function objectDefinePropertiesDemonstration() {
  const object = new DET({})
  object.addEventListener(
    'defineProperties'
  )

}