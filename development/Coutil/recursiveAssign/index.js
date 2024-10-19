function recursiveAssign() {
  const $arguments = [...arguments]
  const $target = $arguments.shift()
  const $sources = $arguments
  iterateSources: 
  for(const $source of $sources) {
    iterateSourceEntries: 
    for(const [
      $sourcePropKey, $sourcePropValue
    ] of Object.entries($source)) {
      // Type: Object
      if(typeof $sourcePropValue === 'object') {
        let targetPropValue
        if($target[$sourcePropKey] === undefined) {
          $target[$sourcePropKey] = $sourcePropValue
        } else {
          $target[$sourcePropKey] = recursiveAssign(
            $target[$sourcePropKey], $sourcePropValue
          )
        }
      }
      // Type: Primitive
      else {
        $target[$sourcePropKey] = $sourcePropValue
      }
    }
  }
  return $target
}
export default recursiveAssign