import * as Logs from "../coutil/logs/index.js"
import * as Tests from "./tests/index.js"
import Test from "../coutil/test/index.js"
import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil

/*
Validate Property: Literals
  Property Value Type: Boolean (Test A)
  Property Value Type: Number - Range Validator (Test B)
  Property Value Type: String - Length Validator (Test C)
  Property Value Type: Enum Validator (Test D)
  Property Value Type: undefined (Test E)
*/
const validation = {}
const tests = {}
for(const [$testName, $testSettings] of Object.entries(Tests)) {
  tests[$testName] = new Test($testSettings).execute()
  console.log($testName, tests[$testName])
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
