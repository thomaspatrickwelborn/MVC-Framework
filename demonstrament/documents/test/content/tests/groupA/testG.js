import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import simplexObjectSchemaProperties from './coutil/simplexObjectSchemaProperties.js'
import * as ContentAssignments from './coutil/contentAssignments.js'
const PropertyKeys = ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]
const { expandTree } = Coutil
export default {
  id: "testG", name: `Simplex Objects - No Validator Events`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>schema.required</code>: <code>false</code></li>
      <li><code>content.validationEvents</code>: <code>false</code></li>
    </ul>
  `, 
  collect: new Map([
    // [0, ``],
  ]),
  method: async function() {
    const solve = [
      ["validPropertyKey", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true, true, true, true, true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true, true, true, true, true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["validProperty", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true, true, true, true, true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true, true, true, true, true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["nonvalidPropertyKey", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true, true, true, true, true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true, true, true, true, true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["nonvalidProperty", [
        ["contentAssignmentsA", [true, true, true, true, true]],
        ["contentAssignmentsB", [true, true, true, true, true]],
        ["contentAssignmentsC", [true, true, true, true, true]],
        ["contentAssignmentsD", [true, true, true, true, true]],
        ["contentAssignmentsE", [true, true, true, true, true]],
        ["contentAssignmentsF", [true, true, true, true, true]],
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
        const schema = new Schema(simplexObjectSchemaProperties, { required: false } )
        const content = new Content({}, schema, { validationEvents: false })
        if($eventName === "validPropertyKey") {
          for(const $propertyKey of ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers.promise)
            function validPropertyKeyListener($event) {
              const { type, key, value, detail } = $event
              resolvers.resolve(false)
              resolvers.resolved = true
            }
            content.addEventListener(`validPropertyKey:${$propertyKey}`, validPropertyKeyListener)
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
        else if($eventName === "validProperty") {
          for(const $propertyKey of ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers)
          }
          let propertyResolversIndex = 0
          function validPropertyListener($event) {
            const { type, key, value, detail } = $event
            const resolvers = $quest[propertyResolversIndex]
            resolvers.resolve(false)
            resolvers.resolved = true
          }
          content.addEventListener(`validProperty`, validPropertyListener)
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

        else if($eventName === "nonvalidPropertyKey") {
          for(const $propertyKey of ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers.promise)
            function nonvalidPropertyKeyListener($event) {
              const { type, key, value, detail } = $event
              resolvers.resolve(false)
              resolvers.resolved = true
            }
            content.addEventListener(`nonvalidPropertyKey:${$propertyKey}`, nonvalidPropertyKeyListener)
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
        else if($eventName === "nonvalidProperty") {
          for(const $propertyKey of ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]) {
            const resolvers = Object.assign(Promise.withResolvers(), { resolved: false })
            $quest.push(resolvers)
          }
          let propertyResolversIndex = 0
          function nonvalidPropertyListener($event) {
            const { type, key, value, detail } = $event
            const resolvers = $quest[propertyResolversIndex]
            resolvers.resolve(false)
            resolvers.resolved = true
          }
          content.addEventListener(`nonvalidProperty`, nonvalidPropertyListener)
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