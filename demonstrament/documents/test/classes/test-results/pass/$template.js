export default function PassTemplate($model) { return `
  <pass
    data-pass="${$model.result}"
  ></pass>
` }
