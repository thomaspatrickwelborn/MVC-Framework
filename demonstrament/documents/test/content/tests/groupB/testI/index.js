import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import * as AssignmentKeys from '../coutil/assignmentKeys.js'
import * as Assignments from '../coutil/assignments/index.js'
const { objectCount } = Coutil
const { AssignmentSourceProperties } = AssignmentKeys
const ContentOptions = {
  traps: { object: { assign: {
    sourceTree: false,
  } } },
}
export default {
  id: "testI", name: `
    <div>
      Complex Objects - No Schema, With <code>assign</code> Event
    </div>
  `,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
      <li><code>content.events</code>: <code>true</code></li>
      <ul>
        <li><code>"assign"</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([[0, ``]]),
  method: async function() {
    // const schema = new Schema(SchemaProperties, SchemaOptions)
    const assignSolveSources = () => [
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
          targets[$assignmentSourceName].addEventListener("assign", assignListener)
        }
        else {
          targets[$assignmentSourceName] = targets[$assignmentSourceName]
        }
        const target = targets[$assignmentSourceName]
        var assignValidatorEvents = $validation[0][1]
        var assignEventsSize = assignmentSources.reduce(
          ($assignEventsSize, $source) => $assignEventsSize += objectCount($source) ,0
        ) - (assignmentSources.length - 1)
        var assignEventsIndex = 0
        while(assignEventsIndex < assignEventsSize) {
          const promiseResolvers = Promise.withResolvers()
          assignValidatorEvents.push(Object.assign({
            resolved: false,
            resolution: undefined,
          }, promiseResolvers))
          assignEventsIndex++
        }
        assignEventsIndex = 0
        function assignListener($event) {
          const { path } = $event
          const promiseResolvers = assignValidatorEvents[assignEventsIndex]
          const promiseResolution = true
          promiseResolvers.resolve(promiseResolution)
          promiseResolvers.resolution = promiseResolution
          promiseResolvers.resolved = true
          assignEventsIndex++
        }
        target.assign(...assignmentSources)
        await new Promise(($resolve, $reject) => {
          setTimeout(() => {
            assignValidatorEvents.forEach(($promiseResolver) => {
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