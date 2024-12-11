import TestGroupTemplate from './test-group/$template.js'
export default function TestResultsTemplate($model) { return `
  <test-results data-pass="${$model.pass}">
    <pass data-pass="${$model.pass}"></pass>
    <id>___</id>
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