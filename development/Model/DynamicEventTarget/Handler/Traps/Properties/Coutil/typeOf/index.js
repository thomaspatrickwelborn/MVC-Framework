// import { typeOf } from  '../../../../../../../Coutil/index.js'
// export default typeOf
const typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase()

export default typeOf