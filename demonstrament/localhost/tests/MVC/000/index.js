import { DET } from '/dependencies/mvc-framework.js'

function DOMContentLoaded() {
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
        kkk: "111111"
      }
    }
  })
  console.log(object)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
