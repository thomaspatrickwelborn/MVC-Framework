// All Valid Properties - Series Assignment
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
// Some Valid Properties - Series Assignment
const contentAssignmentsE = [
  { propertyA: true },
  { propertyB: false },
  { propertyC: "true" },
  { propertyD: undefined },
  { propertyE: false },
]
// Some Valid Properties - Single Assignment
const contentAssignmentsF = [{
  propertyA: false,
  propertyB: false,
  propertyC: "false",
  propertyD: undefined,
  propertyE: true,
}]

export {
  contentAssignmentsA,
  contentAssignmentsB,
  contentAssignmentsC,
  contentAssignmentsD,
  contentAssignmentsE,
  contentAssignmentsF,
}