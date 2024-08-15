import { DET } from '/dependencies/mvc-framework.js'
function objectAssign($event) {
  console.log($event.type, $event.detail)
}
export default function DETObjectInstantiation() {
  const object = new DET({
    aaa: 111,
    bbb: true,
    ccc: "333",
    ddd: {
      eee: 555,
      fff: false,
      ggg: "777",
      hhh: {
        iii: 999,
        jjj: null,
        kkk: "111111",
      },
    },
  })
  object.addEventListener("assign", objectAssign)
  object.assign({ aaa: 111111 })
  console.log(object.inspect())
  object.removeEventListener("assign", objectAssign)
  object.assign({ aaa: 111111111 })
}