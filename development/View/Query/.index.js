import * as parsel from '../../../node_modules/parsel-js/dist/parsel.js'
const Combinators = {
  descendant: " ",
  child: ">",
  subsequentSibling: "~",
  nextSibling: "+",
}
function Query($element, $queryMethod, $queryString) {
  console.log(
    "\n", "-----",
    "\n", "Query",
    "\n", "-----",
  )
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
  iterateChildren: 
  for(const [$childIndex, $child] of Object.entries(Array.from($element.children))) {
    if(scopeQueryParse.type === 'complex') {
      const { left, combinator, right } = scopeQueryParse
      const lexter = Query($element, $queryMethod, parsel.stringify(left))
      let dexter
      if(lexter.length) {
        if(combinator === Combinators.subsequentSibling) {
          const subsequentQuery = []
          iterateSubsequentChildren: 
          for(const $subsequentChild of $element.children.slice($childIndex + 1)) {
            dexter = Query($subsequentChild, $queryMethod, parsel.stringify(right))
          }
        }
        else if(combinator === Combinators.nextSibling) {
          iterateSubsequentChildren: 
          for(const $subsequentChild of $element.children.slice($childIndex + 1)) {
            dexter = Query($subsequentChild, $queryMethod, parsel.stringify(right))
            if(dexter.length) break iterateSubsequentChildren
          }
        }
        else if(combinator === Combinators.child) {
          dexter = Query($child, $queryMethod, [':scope', parsel.stringify(right)].join(Combinators.child))
        }
        else if(combinator === Combinators.descendent) {
          dexter = Query($child, $queryMethod, [':scope', parsel.stringify(right)].join(Combinators.descendent))
        }
        query = query.concat(dexter)
      }
    }
    else {
      const childMatchesScopeQueryString = $child.matches(scopeQueryString)
      if(childMatchesScopeQueryString) query = query.concat($child)
      if(scopeCombinator === ' ') {
        const childQuery = $child[$queryMethod](scopeQueryString)
        if(childQuery) query = query.concat(childQuery)
      }
    }
    if($queryMethod === 'querySelector' && query.length > 0) break iterateChildren
  }
  if($queryMethod === 'querySelector') return query[0] || null
  if(queryMethod === 'querySelectorAll') return query
}
export default Query