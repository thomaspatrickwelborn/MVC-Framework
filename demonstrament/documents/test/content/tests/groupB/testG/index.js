import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import * as AssignmentKeys from '../coutil/assignmentKeys.js'
import * as Assignments from '../coutil/assignments/index.js'
const { pathkeytree } = Coutil
const { AssignmentSourceProperties } = AssignmentKeys
// import SchemaProperties from '../coutil/schemaProperties.js'
// const SchemaOptions = {
//   required: true
// }
const ContentOptions = {
  traps: { object: { assign: {
    sourceTree: false,
  } } },
}
export default {
  id: "testG", name: `Complex Objects - With Schema, With Events`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
      <li><code>content.events</code>: <code>true</code></li>
      <ul>
        <li><code>"assignSourceProperty"</code></li>
        <li><code>"assignSource"</code></li>
        <li><code>"assign"</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([[0, ``]]),
  method: async function() {
    // const schema = new Schema(SchemaProperties, SchemaOptions)
    const assignSolveSources = () => [
      ["assignSourceProperty", []],
      ["assignSource", []],
      ["assign", []],
    ]
    const assignmentsSolve = () => [
      ["assignmentSourcesA", assignSolveSources()],
      ["assignmentSourcesB", assignSolveSources()],
      ["assignmentSourcesC", assignSolveSources()],
      ["assignmentSourcesD", assignSolveSources()],
      ["assignmentSourcesE", assignSolveSources()],
      ["assignmentSourcesF", assignSolveSources()],
    ]
    // const solve = [
    //   ["assignmentsA", assignmentsSolve()],
    //   ["assignmentsB", assignmentsSolve()],
    // ]
    const validations = [
      ["assignmentsA", assignmentsSolve()],
      ["assignmentsB", assignmentsSolve()],
    ]
    const targets = {
      "assignmentSourcesA": undefined,
      "assignmentSourcesB": undefined,
      "assignmentSourcesC": undefined,
      "assignmentSourcesD": undefined,
      "assignmentSourcesE": undefined,
      "assignmentSourcesF": undefined,
    }
    iterateAssignments: 
    for(const [$assignmentIndex, $assignmentName] of Object.entries(AssignmentKeys.Assignments)) {
      iterateAssignmentSources: 
      for(const [$assignmentSourceIndex, $assignmentSourceName] of Object.entries(AssignmentKeys.AssignmentSources)) {
        const [$validationName, $validation] = validations[$assignmentIndex][1][$assignmentSourceIndex]
        const assignmentSources = Assignments[$assignmentName][$assignmentSourceName]
        if(targets[$assignmentSourceName] === undefined) {
          targets[$assignmentSourceName] = new Content({}, null, ContentOptions)
          targets[$assignmentSourceName].addEventListener("assignSourceProperty", assignSourcePropertyListener)
        }
        else {
          targets[$assignmentSourceName] = targets[$assignmentSourceName]
        }
        const target = targets[$assignmentSourceName]
        // ----------------------------
        // Assign Source Property Event
        // ----------------------------
        var assignSourcePropertyValidatorEvents = $validation[0][1]
        var assignSourcePropertyEventsSize = assignmentSources.reduce((
          $assignSourcePropertyEventsSize, $assignSource
        ) => $assignSourcePropertyEventsSize += pathkeytree($assignSource).length, 0)
        var assignSourcePropertyEventsIndex = 0
        while(assignSourcePropertyEventsIndex < assignSourcePropertyEventsSize) {
          const promiseResolvers = Promise.withResolvers()
          assignSourcePropertyValidatorEvents.push(Object.assign({
            resolved: false,
            resolution: undefined,
          }, promiseResolvers))
          assignSourcePropertyEventsIndex++
        }
        assignSourcePropertyEventsIndex = 0
        function assignSourcePropertyListener($event) {
          const { path } = $event
          const promiseResolvers = assignSourcePropertyValidatorEvents[assignSourcePropertyEventsIndex]
          const promiseResolution = true
          promiseResolvers.resolve(promiseResolution)
          promiseResolvers.resolution = promiseResolution
          promiseResolvers.resolved = true
          assignSourcePropertyEventsIndex++
        }
        target.assign(...assignmentSources)
        await new Promise(($resolve, $reject) => {
          setTimeout(() => {
            assignSourcePropertyValidatorEvents.forEach(($promiseResolver) => {
              if($promiseResolver.resolved === false) {
                const promiseResolution = false
                $promiseResolver.resolve(promiseResolution)
                $promiseResolver.resolution = promiseResolution
                $promiseResolver.resolved = true
              }
            })
            $resolve(true)
          }, 50)
        })
        // -------------------
        // Assign Source Event
        // -------------------
        // const assignSourceEventsSize = assignmentSources.length
        // let assignSourceEvents
        // function assignSourceListener($event) {}
        // targetContent.addEventListener("assignSource", assignSourceListener)
        // ------------
        // Assign Event
        // ------------
        // const assignEventsSize = 1
        // function assignListener($event) {}
        // targetContent.addEventListener("assign", assignListener)
        // -----
      }
    }
    this.pass = (!JSON.stringify(validations).match("\"resolution\":false")) ? true : false
    this.detail = {
      method: this.method.toString(),
      // solve,
      targets,
      validations,
    }
    return this
  },
}