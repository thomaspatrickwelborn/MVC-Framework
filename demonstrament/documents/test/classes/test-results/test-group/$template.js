import TestResultTemplate from '../test-result/$template.js'
export default function TestGroupTemplate($model) { return `
  <test-group data-pass="${$model.pass}">
    <pass data-pass="${$model.pass}"></pass>
    <id>${$model.id}</id>
    <name>${$model.name}</name>
    <tests>
      ${Array.from($model.tests.entries()).map(([
        $testName, $test
        ]) => {
        return TestResultTemplate($test)
      }).join("\n")}
    </tests>
  </test-group>
` }