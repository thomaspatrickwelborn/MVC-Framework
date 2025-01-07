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
        ["contentAssignmentsA", []],
        ["contentAssignmentsB", []],
        ["contentAssignmentsC", []],
        ["contentAssignmentsD", []],
        ["contentAssignmentsE", []],
        ["contentAssignmentsF", []],
      ]],
      ["validProperty", [
        ["contentAssignmentsA", []],
        ["contentAssignmentsB", []],
        ["contentAssignmentsC", []],
        ["contentAssignmentsD", []],
        ["contentAssignmentsE", []],
        ["contentAssignmentsF", []],
      ]],
      ["nonvalidPropertyKey", [
        ["contentAssignmentsA", []],
        ["contentAssignmentsB", []],
        ["contentAssignmentsC", []],
        ["contentAssignmentsD", []],
        ["contentAssignmentsE", []],
        ["contentAssignmentsF", []],
      ]],
      ["nonvalidProperty", [
        ["contentAssignmentsA", []],
        ["contentAssignmentsB", []],
        ["contentAssignmentsC", []],
        ["contentAssignmentsD", []],
        ["contentAssignmentsE", []],
        ["contentAssignmentsF", []],
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
        const [$contentName, $content] = validations[solveEventsIndex][1][solveAssignmentsIndex]
        const schema = new Schema(simplexObjectSchemaProperties, { required: false } )
        const content = new Content({}, simplexObjectSchemaProperties, { validationEvents: false })
        if($eventName === "validPropertyKey") {
          for(const $propertyKey of PropertyKeys) {
            const resolvers = Promise.withResolvers()
            function validPropertyKeyListener($event) {
              const { type, key, value } = $event
              const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
              const alterPropertyDescriptor = Object.getOwnPropertyDescriptor(alterObjectAssignment, key)
              const alterkey = (alterPropertyDescriptor) ? key : undefined
              const altervalue = alterPropertyDescriptor?.value
              const altertype = `validProperty:${key}`
              const verifications = [
                ["key", {
                  detail: {
                    code: `(key === alterkey)`,
                    statement: `(${key} === ${alterkey})`,
                    evaluation: (key === alterkey),
                  }
                }],
                ["value", {
                  detail: {
                    code: `(value === altervalue)`,
                    statement: `(${value} === ${altervalue})`,
                    evaluation: (value === altervalue),
                  }
                }],
                ["type", {
                  detail: {
                    code: `(type === altertype)`,
                    statement: `(${type} === ${altertype})`,
                    evaluation: (type === altertype),
                  }
                }],
              ]
              const pass = verifications.reduce(($pass, [
                $verificationName, $verification
              ]) => {
                if($pass === false) { return $pass}
                return $verification.detail.evaluation
              }, undefined)
              const validation = {
                verifications,
                pass,
              }
              $validation.push(validation)
              $quest.push(resolvers.promise)
              resolvers.resolve(validation.pass)
            }
            content.addEventListener(`validProperty:${$propertyKey}`, validPropertyKeyListener)
          }
        }
        else if($eventName === "validProperty") {
          const resolvers = Promise.withResolvers()
          function validPropertyListener($event) {
            const { type, key, value } = $event
            const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
            const alterPropertyDescriptor = Object.getOwnPropertyDescriptor(alterObjectAssignment, key)
            const alterkey = (alterPropertyDescriptor) ? key : undefined
            const altervalue = alterPropertyDescriptor?.value
            const altertype = `validProperty`
            const verifications = [
              ["key", {
                detail: {
                  code: `(key === alterkey)`,
                  statement: `(${key} === ${alterkey})`,
                  evaluation: (key === alterkey),
                }
              }],
              ["value", {
                detail: {
                  code: `(value === altervalue)`,
                  statement: `(${value} === ${altervalue})`,
                  evaluation: (value === altervalue),
                }
              }],
              ["type", {
                detail: {
                  code: `(type === altertype)`,
                  statement: `(${type} === ${altertype})`,
                  evaluation: (type === altertype),
                }
              }],
            ]
            const pass = verifications.reduce(($pass, [
              $verificationName, $verification
            ]) => {
              if($pass === false) { return $pass}
              return $verification.detail.evaluation
            }, undefined)
            const validation = {
              verifications,
              pass,
            }
            $validation.push(validation)
            $quest.push(resolvers.promise)
            resolvers.resolve(validation.pass)
          }
          content.addEventListener(`validProperty`, validPropertyListener)
        }
        else if($eventName === "nonvalidPropertyKey") {
          for(const $propertyKey of PropertyKeys) {
            const resolvers = Promise.withResolvers()
            function nonvalidPropertyKeyListener($event) {
              const { type, key, value } = $event
              const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
              const alterPropertyDescriptor = Object.getOwnPropertyDescriptor(alterObjectAssignment, key)
              const alterkey = (alterPropertyDescriptor) ? key : undefined
              const altervalue = alterPropertyDescriptor?.value
              const altertype = `nonvalidProperty:${key}`
              const verifications = [
                ["key", {
                  detail: {
                    code: `(key === alterkey)`,
                    statement: `(${key} === ${alterkey})`,
                    evaluation: (key === alterkey),
                  }
                }],
                ["value", {
                  detail: {
                    code: `(value === altervalue)`,
                    statement: `(${value} === ${altervalue})`,
                    evaluation: (value === altervalue),
                  }
                }],
                ["type", {
                  detail: {
                    code: `(type === altertype)`,
                    statement: `(${type} === ${altertype})`,
                    evaluation: (type === altertype),
                  }
                }],
              ]
              const pass = verifications.reduce(($pass, [
                $verificationName, $verification
              ]) => {
                if($pass === false) { return $pass}
                return $verification.detail.evaluation
              }, undefined)
              const validation = {
                verifications,
                pass,
              }
              $validation.push(validation)
              $quest.push(resolvers.promise)
              resolvers.resolve(validation.pass)
            }
            content.addEventListener(`nonvalidProperty:${$propertyKey}`, nonvalidPropertyKeyListener)
          }
        }
        else if($eventName === "nonvalidProperty") {
          const resolvers = Promise.withResolvers()
          function nonvalidPropertyListener($event) {
            const { type, key, value } = $event
            const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
            const alterPropertyDescriptor = Object.getOwnPropertyDescriptor(alterObjectAssignment, key)
            const alterkey = (alterPropertyDescriptor) ? key : undefined
            const altervalue = alterPropertyDescriptor?.value
            const altertype = `nonvalidProperty`
            const verifications = [
              ["key", {
                detail: {
                  code: `(key === alterkey)`,
                  statement: `(${key} === ${alterkey})`,
                  evaluation: (key === alterkey),
                }
              }],
              ["value", {
                detail: {
                  code: `(value === altervalue)`,
                  statement: `(${value} === ${altervalue})`,
                  evaluation: (value === altervalue),
                }
              }],
              ["type", {
                detail: {
                  code: `(type === altertype)`,
                  statement: `(${type} === ${altertype})`,
                  evaluation: (type === altertype),
                }
              }],
            ]
            const pass = verifications.reduce(($pass, [
              $verificationName, $verification
            ]) => {
              if($pass === false) { return $pass}
              return $verification.detail.evaluation
            }, undefined)
            const validation = {
              verifications,
              pass,
            }
            $validation.push(validation)
            $quest.push(resolvers.promise)
            resolvers.resolve(validation.pass)
          }
          content.addEventListener(`nonvalidProperty`, nonvalidPropertyListener)
        }
        content.assign(...contentAssignmentSources)
        $quest.splice(0, $quest.length, ...await Promise.all($quest))
        solveAssignmentsIndex++
      }
      solveEventsIndex++
    }
    const schema = new Schema(simplexObjectSchemaProperties, { required: true} )
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