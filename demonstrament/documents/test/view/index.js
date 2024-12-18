import { View } from '/dependencies/mvc-framework.js'
const QuerySelectors = {
  querySelector: {
    ':scope > div#_1 ~ div#_3 > subdiv#_3_2': ':scope > div#_1 ~ div#_3 > subdiv#_3_2',
  }
}
const index = document.querySelector('index')
const view = new View({
  scope: 'template',
  // parent: document.querySelector('index'),
  parent: index,
  templates: { default: () => `
    <div id="_1">DIV[ID="_1"]</div>
    <div id="_2">DIV[ID="_2"]</div>
    <div id="_3">
      <subdiv id="_3_1">SUBDIV[ID="_3_1"]</subdiv>
      <subdiv id="_3_2">SUBDIV[ID="_3_2"]</subdiv>
      <subdiv id="_3_3">SUBDIV[ID="_3_3"]</subdiv>
    </div>
  ` },
  querySelectors: QuerySelectors
})
view.render()
// Query Selector
console.log(Object.entries(QuerySelectors))
Object.entries(QuerySelectors)
.forEach(
  ([$queryMethod, $queries]) => {
    Object.entries($queries)
    .forEach(
      ([$queryName, $query]) => {
        console.log($query)
        console.log(
          "\n", "-------------",
          "\n", "Element Query",
          "\n", "-------------",
          "\n", index[$query.method]($query.selector)
        )
        console.log(
          "\n", "-------------",
          "\n", "View Query",
          "\n", "-------------",
          "\n", view[$query.method]($query.selector)
        )
      }
    )
  }
)