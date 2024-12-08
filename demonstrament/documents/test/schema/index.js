import * as Logs from "../coutil/logs/index.js"
import { Schema, Coutil } from '/dependencies/mvc-framework.js'
import { TestResults } from "../classes/index.js"
import Tests from "./tests/index.js"

const testResults = new TestResults({
  model: Tests
})
testResults.render()