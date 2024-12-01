import * as Logs from "../coutil/logs/index.js"
import * as Tests from "./tests/index.js"
import Test from "../coutil/test/index.js"
import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil

/*
Validate Property: Literals
  Property Value Type: Boolean
  Property Value Type: Number
    - Range Validator
  Property Value Type: String
    - Enum Validator
    - Length Validator
  Property Value Type: undefined
*/
const validation = {}
const tests = {}
for(const [$testName, $testSettings] of Object.entries(Tests)) {
  tests[$testName] = new Test($testSettings).execute()
  console.log($testName, tests[$testName])
  // Logs.testResultsLog($test.execute())
}

/*
Validation: Monodimensional Properties
  Validation Type: Object
  Validation Type: Primitive
*/

/*
Validation Multidimensional Properties
  Validation Type: Object
  Validation Type: Primitive
*/

/*
Validation: Property Validity
  Defined Properties: Valid
  Defined Properties: Nonvalid
  Defined Properties: Unvalid
  Defined Properties: Valid/Nonvalid/Unvalid
  Defined Properties: Complete Properties
  Defined Properties: Incomplete Properties
*/
