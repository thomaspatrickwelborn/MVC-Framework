import { Content, Coutil } from '/dependencies/mvc-framework.js'
import simplexObjectSchemaProperties from './coutil/simplexObjectSchemaProperties.js'
import * as ContentAssignments from './coutil/contentAssignments.js'
const {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD,
  contentAssignmentsE, contentAssignmentsF,
} = ContentAssignments
const { expandTree } = Coutil
export default {
  id: "testE", name: `Simplex Objects - No Content Events`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.contentEvents</code>: <code>false</code></li>
    </ul>
  `, 
  collect: new Map([
    [0, ``],
  ]),
  method: async function() {
    const solve = [
      ["assignSourcePropertyKey", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true, true, true, true, true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true, true, true, true, true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["assignSourceProperty", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true, true, true, true, true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true, true, true, true, true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["assignSource", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true]],
      ]],
      ["assign", [
        ["contentAssignmentsA", [true]],
        ["contentAssignmentsB", [true]],
        ["contentAssignmentsC", [true]],
        ["contentAssignmentsD", [true]],
        ["contentAssignmentsE", [true]],
        ["contentAssignmentsF", [true]],
      ]],
    ]
    const quest = []
    const validations = []
    const contents = []
    let solveEventsIndex = 0
    for(const [
      $eventName, $solveContentAssignments
    ] of solve) {
      quest[solveEventsIndex] = quest[solveEventsIndex] || [$eventName, []]
      validations[solveEventsIndex] = validations[solveEventsIndex] || [$eventName, []]
      contents[solveEventsIndex] = contents[solveEventsIndex] || [$eventName, []]
      let solveAssignmentsIndex = 0
      for(const [
        $contentAssignmentName, $solveContentAssignment
      ] of $solveContentAssignments) {
        quest[solveEventsIndex][1][solveAssignmentsIndex] = quest[solveEventsIndex][1][solveAssignmentsIndex] || [$contentAssignmentName, []]
        validations[solveEventsIndex][1][solveAssignmentsIndex] = validations[solveEventsIndex][1][solveAssignmentsIndex] || [$contentAssignmentName, []]
        contents[solveEventsIndex][1][solveAssignmentsIndex] = contents[solveEventsIndex][1][solveAssignmentsIndex] || [$contentAssignmentName, []]
        const contentAssignmentSources = ContentAssignments[$contentAssignmentName]
        const [$questName, $quest] = quest[solveEventsIndex][1][solveAssignmentsIndex]
        const [$validationName, $validation] = validations[solveEventsIndex][1][solveAssignmentsIndex]
        const [$contentName, $content] = contents[solveEventsIndex][1][solveAssignmentsIndex]
        const content = new Content({}, null, { events: false })
        if($eventName === "assignSourcePropertyKey") {
          for(const $propertyKey of ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers.promise)
            function assignSourcePropertyKeyListener($event) {
              const { type, key, value, detail } = $event
              resolvers.resolve(false)
              resolvers.resolved = true
            }
            content.addEventListener(`assignSourcePropertyKey:${$propertyKey}`, assignSourcePropertyKeyListener)
            content.assign(...contentAssignmentSources)
            await new Promise(($resolve) => {
              setTimeout(() => {
                if(resolvers.resolved === false) {
                  resolvers.resolve(true)
                  resolvers.resolved = true
                }
                $resolve()
              }, 10)
            })
          }
          $quest.splice(0, $quest.length, ...await Promise.all($quest))
        }
        else if($eventName === "assignSourceProperty") {
          for(const $propertyKey of ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers)
          }
          let propertyResolversIndex = 0
          function assignSourcePropertyListener($event) {
            const { type, key, value, detail } = $event
            const resolvers = $quest[propertyResolversIndex]
            resolvers.resolve(false)
            resolvers.resolved = true
          }
          content.addEventListener(`assignSourceProperty`, assignSourcePropertyListener)
          content.assign(...contentAssignmentSources)
          await new Promise(($resolve) => {
            setTimeout(() => {
              if($quest.find(($resolver) => $resolver.resolved === false)) {
                $quest.forEach(($resolver) => {
                  $resolver.resolve(true)
                  $resolver.resolved = true
                })
              }
              $resolve(true)
            }, 10)
          })
          $quest.splice(0, $quest.length, ...await Promise.all($quest.map(($resolver) => $resolver.promise)))
        }
        else if($eventName === "assignSource") {
          const contentAssignmentSources = ContentAssignments[$contentAssignmentName]
          for(const $contentAssignmentSource of contentAssignmentSources) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers)
          }
          function assignSourceListener($event) {
            const { type, key, value, detail } = $event
            const resolvers = $quest[propertyResolversIndex]
            resolvers.resolve(false)
            resolvers.resolved = true
          }
          content.addEventListener(`assignSource`, assignSourceListener)
          content.assign(...contentAssignmentSources)
          await new Promise(($resolve) => {
            setTimeout(() => {
              if($quest.find(($resolver) => $resolver.resolved === false)) {
                $quest.forEach(($resolver) => {
                  $resolver.resolve(true)
                  $resolver.resolved = true
                })
              }
              $resolve()
            }, 10)
          })
          $quest.splice(0, $quest.length, ...await Promise.all($quest.map(($resolver) => $resolver.promise)))
        }
        else if($eventName === "assign") {
          const contentAssignmentSources = ContentAssignments[$contentAssignmentName]
          const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
          $quest.push(resolvers)
          function assignListener($event) {
            const { type, key, value, detail } = $event
            const resolvers = $quest[propertyResolversIndex]
            resolvers.resolve(false)
            resolvers.resolved = true
          }
          content.addEventListener(`assign`, assignListener)
          content.assign(...contentAssignmentSources)
          await new Promise(($resolve) => {
            setTimeout(() => {
              if($quest.find(($resolver) => $resolver.resolved === false)) {
                $quest.forEach(($resolver) => {
                  $resolver.resolve(true)
                  $resolver.resolved = true
                })
              }
              $resolve()
            }, 10)
          })
          $quest.splice(0, $quest.length, ...await Promise.all($quest.map(($resolver) => $resolver.promise)))
        }
        $content.push(content)
        solveAssignmentsIndex++
      }
      solveEventsIndex++
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      method: this.method.toString(),
      quest,
      solve,
      validations,
    }
    return this
  },
}