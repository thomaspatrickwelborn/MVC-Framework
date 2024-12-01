const testResultsLog = ($test) => {
  console.log(
    "\n", "-----",
    "\n", `Group: ${$test.group}`,
    "\n", `Name: ${$test.name}`,
    "\n", `Descript: ${$test.descript}`,
    "\n", `PASS: ${$test.results.pass}`,
    "\n", 'detail:', $test.results.detail,
  )
}
const validatorEventLog = ($event) => {
  console.log(
    "\n", "-----",
    "\n", "type", $event.type,
    "\n", "path", $event.path,
    "\n", "key", $event.detail.key,
    "\n", "value", $event.detail.value,
    "\n", "valid", $event.detail.valid,
    "\n", "detail", $event.detail,
  )
}
const contentEventLog = ($event) => {
  console.log(
    "\n", "-----",
    "\n", "type", $event.type,
    "\n", "path", $event.path,
    "\n", "value", $event.value,
    "\n", "detail", $event.detail,
  )
}
const changeEventLog = ($event) => {
  console.log(
    "\n", "-----",
    "\n", "type", $event.type,
    "\n", "path", $event.path,
    "\n", "value", $event.value,
    "\n", "preter", $event.change.preter,
    "\n", "conter", $event.change.conter,
    "\n", "anter", $event.change.anter,
  )
}
export {
  testResultsLog,
  validatorEventLog, 
  contentEventLog, 
  changeEventLog,
}