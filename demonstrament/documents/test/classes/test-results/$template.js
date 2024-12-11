import PassTemplate from './pass/$template.js'
import TestGroupTemplate from './test-group/$template.js'
export default function TestResultsTemplate($model) { return `
  <test-results
    class="pand-tree"
    data-pass="${$model.pass.result}"
  >
    ${PassTemplate($model.pass)}
    <id>${$model.id}</id>
    <name>${$model.name}</name>
    <test-groups>
      ${Array.from($model.groups.entries()).map(([
        $groupName, $group
      ]) => {
        return TestGroupTemplate($group)
      }).join("\n")}
    </test-groups>
  </test-results>
` }