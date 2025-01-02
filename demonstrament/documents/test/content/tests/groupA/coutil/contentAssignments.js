const contentAssignmentsA = [
  { propertyA: true },
  { propertyB: 1 },
  { propertyC: "true" },
  { propertyD: null },
  { propertyE: false },
]
// All Valid Properties - Single Assignment
const contentAssignmentsB = [{
  propertyA: false,
  propertyB: 0,
  propertyC: "false",
  propertyD: null,
  propertyE: true,
}]
// All Nonvalid Properties - Series Assignment - 
const contentAssignmentsC = [
  { propertyA: "false" },
  { propertyB: false },
  { propertyC: 0 },
  { propertyD: undefined },
  { propertyE: undefined },
]
// All Nonvalid Properties - Single Assignment
const contentAssignmentsD = [{
  propertyA: "false",
  propertyB: false,
  propertyC: 0,
  propertyD: undefined,
  propertyE: undefined,
}]

export {
  contentAssignmentsA,
  contentAssignmentsB,
  contentAssignmentsC,
  contentAssignmentsD,
}