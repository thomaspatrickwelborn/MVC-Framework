import assign from './assign/index.js'
import defineProperties from './defineProperties/index.js'
export default function() {
  return {
    type: 'experiment',
    title: "DET Object",
    hypotheses: [
      assign(),
      defineProperties(),
    ]
  }
}