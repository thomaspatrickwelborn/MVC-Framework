import { View } from '/dependencies/mvc-framework.js'
const QuerySelectors = {
  querySelectorAll: {
    // 'div#_1 ~ div': 'div#_1 ~ div',
    // 'div#_1 + div': 'div#_1 + div',
    // 'div': 'div',
    // 'subdiv': 'subdiv',
    // ':scope > div#_1': ':scope > div#_1',
    ':scope > div#_1 ~ div#_3': ':scope > div#_1 ~ div#_3',
    //
    // ':scope > div#_1 ~ div#_3 > subdiv#_3_2': ':scope > div#_1 ~ div#_3 > subdiv#_3_2',
    // 'div#_1 ~ div#_3 > subdiv#_3_2': 'div#_1 ~ div#_3 > subdiv#_3_2',
    // ':scope > div#_1 ~ div#_3': ':scope > div#_1 ~ div#_3',
    // 'div#_1 ~ div#_3': 'div#_1 ~ div#_3',
  }
}

const index = document.querySelector('index')
const view = new View({
  scope: 'template',
  parent: index,
  templates: { default: () => `
    <div id="_1" class="div">DIV[ID="_1"]</div>
    <div id="_2" class="div">DIV[ID="_2"]</div>
    <div id="_3" class="div">
      <subdiv id="_3_1" class="subdiv">SUBDIV[ID="_3_1"]</subdiv>
      <subdiv id="_3_2" class="subdiv">SUBDIV[ID="_3_2"]</subdiv>
      <subdiv id="_3_3" class="subdiv">SUBDIV[ID="_3_3"]</subdiv>
    </div>
  ` },
  querySelectors: QuerySelectors
})
view.render()

// Query Selector
// console.log(Object.entries(QuerySelectors))
Object.entries(QuerySelectors)
.forEach(
  ([$queryMethod, $queries]) => {
    Object.entries($queries)
    .forEach(
      ([$queryName, $query]) => {
        // console.log($query)
        console.log(
          "\n", "-------------",
          "\n", "Element Query",
          "\n", $query.selector,
          "\n", "-------------",
          "\n", index[$query.method]($query.selector)
        )
        console.log(
          "\n", "-------------",
          "\n", "View Query",
          "\n", $query.selector,
          "\n", "-------------",
          "\n", view[$query.method]($query.selector)
        )
      }
    )
  }
)
