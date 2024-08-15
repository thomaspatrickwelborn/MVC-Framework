import { DET } from '/dependencies/mvc-framework.js'
function objectAssign($event) {
  console.log($event.type, $event.detail.target.parse())
}
function objectFreeze($event) {
  console.log($event.type, $event.detail.target.parse())
}
export default function DETObjectVentilation() {
  const object = new DET({
    aaa: 111,
    bbb: {
      ccc: "333",
      ddd: true,
    },
  })
  object.addEventListener('assign', objectAssign)
  // object.bbb.addEventListener('assign', objectAssign)
  object.bbb.assign({
    ccc: "333333",
    ddd: false,
  })

  object.addEventListener('freeze', objectFreeze)
  // object.bbb.addEventListener('freeze', objectFreeze)
  object.bbb.freeze()

  // object.addEventListener(
  //   'assignSourceProperty',
  // )
}