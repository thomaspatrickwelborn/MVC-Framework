export default function TestResultTemplate($model) { return `
  <test-result data-pass="${$model.pass}">
    <pass data-pass="${$model.pass}"></pass>
    <id>${$model.id}</id>
    <name>${$model.name}</name>
    <detail>
      <descript>${$model.descript}</descript>
    </detail>
  </test-result>
` }