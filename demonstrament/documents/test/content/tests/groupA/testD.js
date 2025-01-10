import { Content } from '/dependencies/mvc-framework.js'
import * as ContentAssignments from './coutil/simplexObjectContentAssignments.js'
const {
  simplexObjectContentAssignmentsA, simplexObjectContentAssignmentsB, 
  simplexObjectContentAssignmentsC, simplexObjectContentAssignmentsD,
  simplexObjectContentAssignmentsE, simplexObjectContentAssignmentsF,
} = ContentAssignments
export default {
  id: "testD", name: `Simplex Objects - Content Events`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
      <li><code>content.events</code>: <code>true</code></li>
      <ul>
        <li><code>"assignSourceProperty:$key"</code></li>
        <li><code>"assignSourceProperty"</code></li>
        <li><code>"assignSource"</code></li>
        <li><code>"assign"</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([
    [0, ``],
  ]),
  method: async function() {
    const quest = [
      // $contentEventName, $simplexObjectContentAssignments
      ["assignSourcePropertyKey", [
        // $contentAssignmentName, $questContentAssignmentProperties
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
      ["assignSourceProperty", [
        // $contentAssignmentName, $questContentAssignmentProperties
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
      ["assignSource", [
        // $contentAssignmentName, $questContentAssignmentSources
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
      ["assign", [
        // $contentAssignmentName, $questContentAssignment
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
    ]
    const solve = [
      // $contentEventName, $simplexObjectContentAssignments
      ["assignSourcePropertyKey", [
        // $contentAssignmentName, $solveContentAssignmentProperties
        // One slot per assignment source property. `
        ["simplexObjectContentAssignmentsA", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsB", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsC", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsD", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsE", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["assignSourceProperty", [
        // $contentAssignmentName, $solveContentAssignmentProperties
        // One slot per assignment source property. 
        ["simplexObjectContentAssignmentsA", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsB", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsC", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsD", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsE", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsF", [true, true, true, true, true]],
      ]],
      ["assignSource", [
        // $contentAssignmentName, $solveContentAssignmentSources
        // One slot per assignment source. 
        ["simplexObjectContentAssignmentsA", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsB", [true]],
        ["simplexObjectContentAssignmentsC", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsD", [true]],
        ["simplexObjectContentAssignmentsE", [true, true, true, true, true]],
        ["simplexObjectContentAssignmentsF", [true]],
      ]],
      ["assign", [
        // $contentAssignmentName, $solveContentAssignment
        // One slot per assignment
        ["simplexObjectContentAssignmentsA", [true]],
        ["simplexObjectContentAssignmentsB", [true]],
        ["simplexObjectContentAssignmentsC", [true]],
        ["simplexObjectContentAssignmentsD", [true]],
        ["simplexObjectContentAssignmentsE", [true]],
        ["simplexObjectContentAssignmentsF", [true]],
      ]],
    ]
    const validations = [
      // $contentEventName, $simplexObjectContentAssignments
      ["assignSourcePropertyKey", [
        // $contentAssignmentName, $validateContentAssignmentProperties
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
      ["assignSourceProperty", [
        // $contentAssignmentName, $validateContentAssignmentProperties
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
      ["assignSource", [
        // $contentAssignmentName, $validateContentAssignmentSources
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
      ["assign", [
        // $contentAssignmentName, $validateContentAssignment
        ["simplexObjectContentAssignmentsA", []],
        ["simplexObjectContentAssignmentsB", []],
        ["simplexObjectContentAssignmentsC", []],
        ["simplexObjectContentAssignmentsD", []],
        ["simplexObjectContentAssignmentsE", []],
        ["simplexObjectContentAssignmentsF", []],
      ]],
    ]
    const assignmentSourceProperties = ["propertyA", "propertyB", "propertyC", "propertyD", "propertyE"]
    const contents = [
      ["assignSourcePropertyKey", [
        ["contentAssignmentTargetA", new Content({}, null)],
        ["contentAssignmentTargetB", new Content({}, null)],
        ["contentAssignmentTargetC", new Content({}, null)],
        ["contentAssignmentTargetD", new Content({}, null)],
        ["contentAssignmentTargetE", new Content({}, null)],
        ["contentAssignmentTargetF", new Content({}, null)],
      ]],
      ["assignSourceProperty", [
        ["contentAssignmentTargetA", new Content({}, null)],
        ["contentAssignmentTargetB", new Content({}, null)],
        ["contentAssignmentTargetC", new Content({}, null)],
        ["contentAssignmentTargetD", new Content({}, null)],
        ["contentAssignmentTargetE", new Content({}, null)],
        ["contentAssignmentTargetF", new Content({}, null)],
      ]],
      ["assignSource", [
        ["contentAssignmentTargetA", new Content({}, null)],
        ["contentAssignmentTargetB", new Content({}, null)],
        ["contentAssignmentTargetC", new Content({}, null)],
        ["contentAssignmentTargetD", new Content({}, null)],
        ["contentAssignmentTargetE", new Content({}, null)],
        ["contentAssignmentTargetF", new Content({}, null)],
      ]],
      ["assign", [
        ["contentAssignmentTargetA", new Content({}, null)],
        ["contentAssignmentTargetB", new Content({}, null)],
        ["contentAssignmentTargetC", new Content({}, null)],
        ["contentAssignmentTargetD", new Content({}, null)],
        ["contentAssignmentTargetE", new Content({}, null)],
        ["contentAssignmentTargetF", new Content({}, null)],
      ]],
      // $contentAssignmentTargetName, $contentAssignmentTarget
    ]
    let contentEventsIndex = 0
    iterateContentEvents: 
    for(const [
      $contentEventName, $simplexObjectContentAssignments
    ] of solve) {
      if($contentEventName === "assignSourcePropertyKey") {
        let contentAssignmentIndex = 0
        iterateContentAssignments: 
        for(const [
          $contentAssignmentName, $contentAssignment
        ] of $simplexObjectContentAssignments) {
          const [
            $contentAssignmentTargetName, $contentAssignmentTarget
          ] = contents[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $validateContentAssignmentName, $validateContentAssignmentProperties
          ] = validations[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $questContentAssignmenName, $questContentAssignmentProperties
          ] = quest[contentEventsIndex][1][contentAssignmentIndex]
          const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
          iterateAssignmentSourceProperties: 
          for(const $assignmentSourceProperty of assignmentSourceProperties) {
            const assignmentSourcePropertyPromise = Promise.withResolvers()
            $questContentAssignmentProperties.push(assignmentSourcePropertyPromise.promise)
            function assignSourcePropertyKeyListener($event) {
              const { type, key, value, detail } = $event
              const { source } = detail
              const alterPropertyDescriptor = Object.getOwnPropertyDescriptor(alterObjectAssignment, key)
              const alterkey = (alterPropertyDescriptor) ? key : undefined
              const altervalue = alterPropertyDescriptor?.value
              const altertype = `assignSourceProperty:${key}`
              const altersource = ContentAssignments[$contentAssignmentName].find(
                ($source) => JSON.stringify($source) === JSON.stringify(source)
              )
              const sourceString = JSON.stringify(source)
              const altersourceString = JSON.stringify(altersource)
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
                ["source", {
                  detail: {
                    code: `(sourceString === altersourceString)`,
                    statement: `(${sourceString} === ${altersourceString})`,
                    evaluation: (sourceString === altersourceString),
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
              $validateContentAssignmentProperties.push(validation)
              assignmentSourcePropertyPromise.resolve(validation.pass)
            }
            $contentAssignmentTarget.addEventListener(
              `assignSourceProperty:${$assignmentSourceProperty}`, assignSourcePropertyKeyListener
            )
          }
          $contentAssignmentTarget.assign(...ContentAssignments[$contentAssignmentName])
          $questContentAssignmentProperties.splice(
            0, $questContentAssignmentProperties.length, ...await Promise.all($questContentAssignmentProperties)
          )
          contentAssignmentIndex++
        }
      }
      else if($contentEventName === "assignSourceProperty") {
        let contentAssignmentIndex = 0
        for(const [
          $contentAssignmentName, $contentAssignment
        ] of $simplexObjectContentAssignments) {
          const [
            $contentAssignmentTargetName, $contentAssignmentTarget
          ] = contents[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $validateContentAssignmentName, $validateContentAssignmentProperties
          ] = validations[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $questContentAssignmenName, $questContentAssignmentProperties
          ] = quest[contentEventsIndex][1][contentAssignmentIndex]
          const assignmentSourcePropertyResolvers = []
          for(const assignmentSourceProperty of assignmentSourceProperties) {
            const assignmentSourcePropertyResolver = Promise.withResolvers()
            assignmentSourcePropertyResolvers.push(assignmentSourcePropertyResolver)
            $questContentAssignmentProperties.push(assignmentSourcePropertyResolver.promise)
          }
          const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
          let assignmentSourcePropertyIndex = 0
          function assignSourcePropertyListener($event) {
            const assignmentSourcePropertyPromise = assignmentSourcePropertyResolvers[assignmentSourcePropertyIndex]
            const { type, key, value, detail } = $event
            const { source } = detail
            const alterPropertyDescriptor = Object.getOwnPropertyDescriptor(alterObjectAssignment, key)
            const alterkey = (alterPropertyDescriptor) ? key : undefined
            const altervalue = alterPropertyDescriptor?.value
            const altertype = `assignSourceProperty`
            const altersource = ContentAssignments[$contentAssignmentName].find(
              ($source) => JSON.stringify($source) === JSON.stringify(source)
            )
            const sourceString = JSON.stringify(source)
            const altersourceString = JSON.stringify(altersource)
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
              ["source", {
                detail: {
                  code: `(sourceString === altersourceString)`,
                  statement: `(${sourceString} === ${altersourceString})`,
                  evaluation: (sourceString === altersourceString),
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
            $validateContentAssignmentProperties.push(validation)
            assignmentSourcePropertyPromise.resolve(validation.pass)
            assignmentSourcePropertyIndex++
          }
          $contentAssignmentTarget.addEventListener("assignSourceProperty", assignSourcePropertyListener)
          $contentAssignmentTarget.assign(...ContentAssignments[$contentAssignmentName])
          $questContentAssignmentProperties.splice(
            0, $questContentAssignmentProperties.length, ...await Promise.all($questContentAssignmentProperties)
          )
          contentAssignmentIndex++
        }
      }
      else if($contentEventName === "assignSource") {
        let contentAssignmentIndex = 0
        for(const [
          $contentAssignmentName, $contentAssignment
        ] of $simplexObjectContentAssignments) {
          const [
            $contentAssignmentTargetName, $contentAssignmentTarget
          ] = contents[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $validateContentAssignmentName, $validateContentAssignmentSources
          ] = validations[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $questContentAssignmenName, $questContentAssignmentSources
          ] = quest[contentEventsIndex][1][contentAssignmentIndex]
          const assignmentSourceResolvers = []
          for(const assignmentSource of $contentAssignment) {
            const assignmentSourceResolver = Promise.withResolvers()
            assignmentSourceResolvers.push(assignmentSourceResolver)
            $questContentAssignmentSources.push(assignmentSourceResolver.promise)
          }
          const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
          let assignmentSourceIndex = 0
          function assignSourceListener($event) {
            const assignmentSourcePromise = assignmentSourceResolvers[assignmentSourceIndex]
            const { type, key, value, detail } = $event
            const { source } = detail
            const altertype = `assignSource`
            const altersource = ContentAssignments[$contentAssignmentName].find(
              ($source) => JSON.stringify($source) === JSON.stringify(source)
            )
            const sourceString = JSON.stringify(source)
            const altersourceString = JSON.stringify(altersource)
            const verifications = [
              ["type", {
                detail: {
                  code: `(type === altertype)`,
                  statement: `(${type} === ${altertype})`,
                  evaluation: (type === altertype),
                }
              }],
              ["source", {
                detail: {
                  code: `(sourceString === altersourceString)`,
                  statement: `(${sourceString} === ${altersourceString})`,
                  evaluation: (sourceString === altersourceString),
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
            $validateContentAssignmentSources.push(validation)
            assignmentSourcePromise.resolve(validation.pass)
            assignmentSourceIndex++
          }
          $contentAssignmentTarget.addEventListener("assignSource", assignSourceListener)
          $contentAssignmentTarget.assign(...ContentAssignments[$contentAssignmentName])
          $questContentAssignmentSources.splice(
            0, $questContentAssignmentSources.length, ...await Promise.all($questContentAssignmentSources)
          )
          contentAssignmentIndex++
        }
      }
      else if($contentEventName === "assign") {
        let contentAssignmentIndex = 0
        for(const [
          $contentAssignmentName, $contentAssignment
        ] of $simplexObjectContentAssignments) {
          const [
            $contentAssignmentTargetName, $contentAssignmentTarget
          ] = contents[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $validateContentAssignmentName, $validateContentAssignment
          ] = validations[contentEventsIndex][1][contentAssignmentIndex]
          const [
            $questContentAssignmenName, $questContentAssignment
          ] = quest[contentEventsIndex][1][contentAssignmentIndex]
          const assignmentResolvers = []
          for(const assignmentSource of $contentAssignment) {
            const assignmentResolver = Promise.withResolvers()
            assignmentResolvers.push(assignmentResolver)
            $questContentAssignment.push(assignmentResolver.promise)
          }
          const alterObjectAssignment = Object.assign({}, ...ContentAssignments[$contentAssignmentName])
          let assignmentIndex = 0
          function assignListener($event) {
            const assignmentPromise = assignmentResolvers[assignmentIndex]
            const { type, key, value, detail } = $event
            const { sources } = detail
            const altertype = `assign`
            const altersources = ContentAssignments[$contentAssignmentName]
            const sourcesString = JSON.stringify(sources)
            const altersourcesString = JSON.stringify(altersources)
            const verifications = [
              ["type", {
                detail: {
                  code: `(type === altertype)`,
                  statement: `(${type} === ${altertype})`,
                  evaluation: (type === altertype),
                }
              }],
              ["source", {
                detail: {
                  code: `(sourceString === altersourceString)`,
                  statement: `(${sourcesString} === ${altersourcesString})`,
                  evaluation: (sourcesString === altersourcesString),
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
            $validateContentAssignment.push(validation)
            assignmentPromise.resolve(validation.pass)
            assignmentIndex++
          }
          $contentAssignmentTarget.addEventListener("assign", assignListener)
          $contentAssignmentTarget.assign(...ContentAssignments[$contentAssignmentName])
          $questContentAssignment.splice(
            0, $questContentAssignment.length, ...await Promise.all($questContentAssignment)
          )
          contentAssignmentIndex++
        }
      }
      contentEventsIndex++
    }
    const questString = JSON.stringify(quest)
    const solveString = JSON.stringify(solve)
    let pass = (solveString === questString)
    this.pass = pass
    this.detail = {
      method: this.method.toString(),
      quest,
      solve,
      validations,
      ContentAssignments,
    }
    return this
  },
}