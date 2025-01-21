// All Valid Properties - Series Assignment
const simplexObjectContentAssignmentsA = [
  { propertyA: true },
  { propertyB: 1 },
  { propertyC: "true" },
  { propertyD: null },
  { propertyE: false },
]
// All Valid Properties - Single Assignment
const simplexObjectContentAssignmentsB = [{
  propertyA: false,
  propertyB: 0,
  propertyC: "false",
  propertyD: null,
  propertyE: true,
}]
// All Nonvalid Properties - Series Assignment - 
const simplexObjectContentAssignmentsC = [
  { propertyA: "false" },
  { propertyB: false },
  { propertyC: 0 },
  { propertyD: undefined },
  { propertyE: undefined },
]
// All Nonvalid Properties - Single Assignment
const simplexObjectContentAssignmentsD = [{
  propertyA: "false",
  propertyB: false,
  propertyC: 0,
  propertyD: undefined,
  propertyE: undefined,
}]
// Some Valid Properties - Series Assignment
const simplexObjectContentAssignmentsE = [
  { propertyA: true },
  { propertyB: false },
  { propertyC: "true" },
  { propertyD: undefined },
  { propertyE: false },
]
// Some Valid Properties - Single Assignment
const simplexObjectContentAssignmentsF = [{
  propertyA: false,
  propertyB: false,
  propertyC: "false",
  propertyD: undefined,
  propertyE: true,
}]

export {
  simplexObjectContentAssignmentsA,
  simplexObjectContentAssignmentsB,
  simplexObjectContentAssignmentsC,
  simplexObjectContentAssignmentsD,
  simplexObjectContentAssignmentsE,
  simplexObjectContentAssignmentsF,
}