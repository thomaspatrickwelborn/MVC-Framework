import * as Assignments from './assignments/index.js'
import {
  assignmentsA,
  assignmentsB,
} from './assignments/index.js'
console.log(assignmentsA["assignmentSourcesB"])
// const assignmentSourcesB = assignmentsA["assignmentSourcesB"].reduce(
//   ($assignmentSource, $source) => {
//     console.log($source)
//     return assignmentSource
//   }
// )
// console.log(assignmentsA["assignmentSourcesB"][0])
// console.log(keytree(assignmentsA["assignmentSourcesB"][0]))
// console.log(keytree(assignmentsA["assignmentSourcesB"][0]).flat())


function keytree($object) {
  const target = []
  for(const [$key, $value] of Object.entries($object)) {
    if(typeof $value === 'object') {
      target.push([$key, keytree($value)])
    }
    else {
      target.push($key)
    }
  }
  return target
}
function pathkeytree($object) {
  const target = []
  for(const [$key, $value] of Object.entries($object)) {
    target.push($key)
    if(typeof $value === 'object') {
      const subtarget = pathkeytree($value)
      for(const $subtarget of subtarget) {
        let path
        if(typeof $subtarget === 'object') {
          path = [$key, ...$subtarget].join('.')
        }
        else {
          path = [$key, $subtarget].join('.')
        }
        target.push(path)
      }
    }
  }
  return target
}
// console.log(keytree(assignmentsA["assignmentSourcesB"][0]))
console.log(pathkeytree(assignmentsA["assignmentSourcesB"][0]))

/*
import { Content, Schema } from '/dependencies/mvc-framework.js'
const assignmentSourcesKeys = [
  "assignmentSourcesA",
  "assignmentSourcesB",
  "assignmentSourcesC",
  "assignmentSourcesD",
  "assignmentSourcesE",
  "assignmentSourcesF",
]
const schemaOptions = {assignmentSourcesB
  required: true
}
const schema = new Schema({
  propertyA: {
    propertyB: {
      propertyC: Boolean,
      propertyD: Number,
      propertyE: String,
    },
    propertyF: Boolean,
    propertyG: Number,
    propertyH: String,
  },
  propertyI: Boolean,
  propertyJ: Number,
  propertyK: String,
}, schemaOptions)
const contentOptions = { traps: { object: { assign: {
  sourceTree: true
}}} }
const content = new Content({}, schema, contentOptions)
console.log(
  "content", 
  content.assign(...assignmentsA["assignmentSourcesB"]).object
)
*/