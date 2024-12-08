import * as Logs from "../coutil/logs/index.js"
import { Schema, Coutil } from '/dependencies/mvc-framework.js'
import { Test, TestResults } from "../classes/index.js"
import * as Tests from "./tests/index.js"
const { expandTree } = Coutil
const validation = {}
const tests = {}
iterateTestGroups: 
for(const [$testGroupID, $testGroup] of Object.entries(Tests).reverse()) {
  tests[$testGroupID] = {}
  iterateTests: 
  for(const [$testID, $testSettings] of Object.entries($testGroup).reverse()) {
    const test = new Test($testSettings).execute()
    tests[$testGroupID][$testID] = test
  }
  const testResults = new TestResults(tests)
  console.log("testResults", testResults)
}