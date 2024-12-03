import * as Logs from "../coutil/logs/index.js"
import * as Tests from "./tests/index.js"
import Test from "../coutil/test/index.js"
import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
const validation = {}
const tests = {}
iterateTestGroups: 
for(const [$testGroupID, $testGroup] of Object.entries(Tests).reverse()) {
  console.log(
    "\n", "-----",
  )
  tests[$testGroupID] = {}
  iterateTests: 
  for(const [$testID, $testSettings] of Object.entries($testGroup).reverse()) {
    const test = new Test($testSettings).execute()
    tests[$testGroupID][$testID] = test
    console.log(
      "\n", [test.groupID, test.id].join("."),
      "\n", ["pass", test.pass].join(" "),
      "\n", test.group,
      "\n", test.name,
      "\n", test
    )
  }
}