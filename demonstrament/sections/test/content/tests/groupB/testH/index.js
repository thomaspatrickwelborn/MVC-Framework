import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import * as AssignmentKeys from '../coutil/assignmentKeys.js'
import * as Assignments from '../coutil/assignments/index.js'
const { pathkeytree, objectCount } = Coutil
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
  id: "testH", name: `
    <div>
      Complex Objects - No Schema, With <code>assignSource</code> Event
    </div>
  `,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
      <li><code>content.events</code>: <code>true</code></li>
      <ul>
        <li><code>"assignSource"</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([[0, ``]]),
  method: async function() {
    // const schema = new Schema(SchemaProperties, SchemaOptions)
    const assignSolveSources = () => [
      ["assignSource", []],
    ]
    const assignmentsSolve = () => [
      ["assignmentSourcesA", assignSolveSources()],
      ["assignmentSourcesB", assignSolveSources()],
      ["assignmentSourcesC", assignSolveSources()],
      ["assignmentSourcesD", assignSolveSources()],
      ["assignmentSourcesE", assignSolveSources()],
      ["assignmentSourcesF", assignSolveSources()],
    ]
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
        console.log($assignmentName, ".", $assignmentSourceName)
        const [$validationName, $validation] = validations[$assignmentIndex][1][$assignmentSourceIndex]
        const assignmentSources = Assignments[$assignmentName][$assignmentSourceName]
        if(targets[$assignmentSourceName] === undefined) {
          targets[$assignmentSourceName] = new Content({}, null, ContentOptions)
          targets[$assignmentSourceName].addEventListener("assignSource", assignSourceListener)
        }
        else {
          targets[$assignmentSourceName] = targets[$assignmentSourceName]
        }
        const target = targets[$assignmentSourceName]
        var assignSourceValidatorEvents = $validation[0][1]
        var assignSourceEventsSize = assignmentSources.reduce(
          ($assignSourceEventsSize, $source) => $assignSourceEventsSize += objectCount($source) ,0
        )
        var assignSourceEventsIndex = 0
        while(assignSourceEventsIndex < assignSourceEventsSize) {
          const promiseResolvers = Promise.withResolvers()
          assignSourceValidatorEvents.push(Object.assign({
            resolved: false,
            resolution: undefined,
          }, promiseResolvers))
          assignSourceEventsIndex++
        }
        assignSourceEventsIndex = 0
        function assignSourceListener($event) {
          const { path } = $event
          const promiseResolvers = assignSourceValidatorEvents[assignSourceEventsIndex]
          const promiseResolution = true
          promiseResolvers.resolve(promiseResolution)
          promiseResolvers.resolution = promiseResolution
          promiseResolvers.resolved = true
          assignSourceEventsIndex++
        }
        target.assign(...assignmentSources)
        await new Promise(($resolve, $reject) => {
          setTimeout(() => {
            assignSourceValidatorEvents.forEach(($promiseResolver) => {
              if($promiseResolver.resolved === false) {
                const promiseResolution = false
                $promiseResolver.resolve(promiseResolution)
                $promiseResolver.resolution = promiseResolution
                $promiseResolver.resolved = true
              }
            })
            $resolve(true)
          }, 1)
        })
      }
    }
    this.pass = (!JSON.stringify(validations).match("\"resolution\":false")) ? true : false
    this.detail = {
      method: this.method.toString(),
      targets,
      validations,
    }
    return this
  },
}