function CoreClassInstantiator() {
  const $arguments = [...arguments]
  const Class = $arguments.slice(0, 1)[0]
  const Parameters = $arguments.slice(1)
  return new Class(...Parameters)
}
function CoreClassDeinstantiator() {
  const $arguments = [...arguments]
  const $classInstance = $arguments.shift()
  return $classInstance
}
export {
  CoreClassInstantiator,
  CoreClassDeinstantiator,
}