import { TestResults } from "../classes/index.js"
import Tests from "./tests/index.js"

const testResults = new TestResults({
  parent: document.querySelector('index'),
  model: Tests,
}).render()
