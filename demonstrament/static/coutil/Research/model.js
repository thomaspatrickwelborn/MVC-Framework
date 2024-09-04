export default class Model extends EventTarget {
  #settings = {}
  #options = {}
  constructor($settings, $options) {
    super()
  }
  get testGroupSummary() {
    title: "",
    pass: ``,
  }
  get testItemSummary() {
    title: "",
    pass: ``,
  }
  get testQuality() {
    string: "", 
    pass: ``,
  }
  get testItem() {
    title: "",
    description: ""
    qualities: [],
  }
  get testGroup() {
    title: "",
    items: [],
  }
  get test() {
    title: "",
    groups: [],
  }
  parse($lhs, $operator, $rhs) {
    switch($operator) {
      case '===': return $lhs === $rhs
      case '!==': return $lhs !== $rhs
      case '>=': return $lhs >= $rhs
      case '<=': return $lhs <= $rhs
      case '==': return $lhs == $rhs
      case '!=': return $lhs != $rhs
    }
  }
}