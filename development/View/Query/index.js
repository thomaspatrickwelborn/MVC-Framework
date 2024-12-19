import * as parsel from '../../../node_modules/parsel-js/dist/parsel.js'
const Combinators = {
  descendant: " ",
  child: ">",
  subsequentSibling: "~",
  nextSibling: "+",
}
function Query($element, $queryMethod, $queryString) {
  let query = []
  let queryString = $queryString
  let queryTokens = parsel.tokenize(queryString)
  // Orient Query Tokens To Scope
  if(queryTokens[0].content !== ':scope') {
    queryString = [':scope', queryString].join(' ')
    queryTokens = parsel.tokenize(queryString)
  }
  // Define Scope
  const scope = queryTokens[0]
  const scopeCombinator = queryTokens[1]
  // Define Scope Query
  const scopeQueryString = parsel.stringify(queryTokens.slice(2))
  const scopeQueryTokens = parsel.tokenize(scopeQueryString)
  const scopeQueryParse = parsel.parse(scopeQueryString)
  const children = Array.from($element.children)
  iterateChildren: 
  for(const [$childIndex, $child] of Object.entries(children)) {

    // Scope Query Type: Complex
    if(scopeQueryParse.type === 'complex') {
      const { left, combinator, right } = scopeQueryParse
      // Lexter
      const lexter = Query($element, $queryMethod, parsel.stringify(left))
      // Dexter
      let dexter
      if(lexter.length) {
        // Combinator: Descendant " "
        if(combinator === Combinators.descendant) {
          dexter = Query($child, $queryMethod, [':scope', parsel.stringify(right)].join(Combinators.descendant))
          query = query.concat(dexter)
        }
        // Combinator: Child ">"
        else if(combinator === Combinators.child) {
          dexter = Query($child, $queryMethod, [':scope', parsel.stringify(right)].join(Combinators.child))
          query = query.concat(dexter)
        }
        // Combinator: Subsequent Sibling "~"
        else if(combinator === Combinators.subsequentSibling) {
          dexter = Query({ children: children.slice($childIndex + 1) }, $queryMethod, parsel.stringify(right))
          query = query.concat(dexter)
        }
        // Combinator: Next Sibling "+"
        else if(combinator === Combinators.nextSibling) {
          dexter = Query({ children: children.slice($childIndex + 1, $childIndex + 2) }, $queryMethod, parsel.stringify(right))
          query = query.concat(dexter)
        }
      }
    }
    // Scope Query Type: Not Complex
    else {
      // Child: Matches Query String
      if($child.matches(scopeQueryString)) query = query.concat($child)
      // Descendant: Query Selector String
      if(scopeCombinator.content === Combinators.descendant) {
        const childQuery = $child[$queryMethod](scopeQueryString)
        if(childQuery instanceof NodeList) query = query.concat(...childQuery)
        else if(childQuery instanceof Node) query = query.concat(childQuery) 
      }
      /*
      */
    }
    /*
    if($queryMethod === 'querySelector' && query.length > 0) return query.slice(0, 1)
    */
  }
  return query
}
export default Query