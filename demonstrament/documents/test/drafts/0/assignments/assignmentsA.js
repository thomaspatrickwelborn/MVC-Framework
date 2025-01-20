// All Valid Properties - Series Assignment
const assignmentSourcesA = [{
  propertyA: {
    propertyB: {
      propertyC: true,
    },
    propertyF: false,
  },
  propertyI: true,
}, {
  propertyA: {
    propertyB: {
      propertyD: 0,
    },
    propertyG: 1,
  },
  propertyJ: 0,
}, {
  propertyA: {
    propertyB: {
      propertyE: "true,"
    },
    propertyH: "false",
  },
  propertyK: "true",
}]
// All Valid Properties - Single Assignment
const assignmentSourcesB = [{
  propertyA: {
    propertyB: {
      propertyC: false,
      propertyD: 1,
      propertyE: "false"
    },
    propertyF: true,
    propertyG: 0,
    propertyH: "true",
  },
  propertyI: false,
  propertyJ: 1,
  propertyK: "false",
}]
// All Nonvalid Properties - Series Assignment - 
const assignmentSourcesC = [{
  propertyA: {
    propertyB: {
      propertyC: "true",
    },
    propertyF: "false",
  },
  propertyI: "true",
}, {
  propertyA: {
    propertyB: {
      propertyD: "0",
    },
    propertyG: "1",
  },
  propertyJ: "0",
}, {
  propertyA: {
    propertyB: {
      propertyE: true,
    },
    propertyH: false,
  },
  propertyK: true,
}]
// All Nonvalid Properties - Single Assignment
const assignmentSourcesD = [{
  propertyA: {
    propertyB: {
      propertyC: "false",
      propertyD: "1",
      propertyE: false,
    },
    propertyF: "true",
    propertyG: "0",
    propertyH: false,
  },
  propertyI: "true",
  propertyJ: "0",
  propertyK: true,
}]
// Some Valid Properties - Series Assignment
const assignmentSourcesE = [{
  propertyA: {
    propertyB: {
      propertyC: true,
    },
    propertyF: "false",
  },
  propertyI: true,
}, {
  propertyA: {
    propertyB: {
      propertyD: "0",
    },
    propertyG: 1,
  },
  propertyJ: "0",
}, {
  propertyA: {
    propertyB: {
      propertyE: "true",
    },
    propertyH: false,
  },
  propertyK: "true",
}]
// Some Valid Properties - Single Assignment
const assignmentSourcesF = [{
  propertyA: {
    propertyB: {
      propertyC: false,
      propertyD: "1",
      propertyE: "false"
    },
    propertyF: "true",
    propertyG: 0,
    propertyH: true,
  },
  propertyI: false,
  propertyJ: "1",
  propertyK: "false",
}]
export {
  assignmentSourcesA,
  assignmentSourcesB,
  assignmentSourcesC,
  assignmentSourcesD,
  assignmentSourcesE,
  assignmentSourcesF,
}
