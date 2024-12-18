function Query($elementTree, $queryTree, $queryMethod) {
  console.log(
    "\n", "-----",
    "\n", "Query",
    "\n", "-----",
  )
  console.log("$elementTree", $elementTree)
  console.log("$queryTree", $queryTree)
  const { type, left, combinator, right } = $queryTree
  const query = []
  if(type === 'complex') {
    if(left.type === 'complex') {
      // 
    }
  }
  return
}
export default Query