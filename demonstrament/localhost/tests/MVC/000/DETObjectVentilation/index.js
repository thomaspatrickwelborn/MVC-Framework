import { DET } from '/dependencies/mvc-framework.js'
function objectAssign($event) {
  // console.log($event)
}
function objectFreeze($event) {
  // console.log($event.type, $event.detail.target)
}
export default function DETObjectVentilation() {
  const object = new DET({
    aaa: {
      bbb: {
        ccc: {
          ddd: 444
        }
      }
    }
  })
  object.aaa.bbb.addEventListener('assign', objectAssign)
  object.assign({
    aaa: {
      bbb: {
        ccc: {
          ddd: 444444
        }
      }
    }
  })
}
// export default function DETObjectVentilation() {
//   const object = new DET({
//     aaa: 111,
//     bbb: {
//       ccc: "333",
//       ddd: true,
//     },
//   })
//   // console.log(object.content)
//   object.bbb.addEventListener('assign', objectAssign)
//   object.addEventListener('assign', objectAssign)
//   object.assign({
//     bbb: {
//       ccc: "333333",
//       ddd: false
//     }
//   })
// }