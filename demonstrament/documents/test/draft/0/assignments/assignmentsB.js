// All Valid Properties - Series Assignment
const assignmentSourcesA = [{
  propertyA: {
    propertyB: {
      propertyC: false,
    },
    propertyF: true,
  },
  propertyI: false,
}, {
  propertyA: {
    propertyB: {
      propertyD: 1,
    },
    propertyG: 0,
  },
  propertyJ: 1,
}, {
  propertyA: {
    propertyB: {
      propertyE: "false",
    },
    propertyH: "true",
  },
  propertyK: "false",
}]
// All Valid Properties - Single Assignment
const assignmentSourcesB = [{
  propertyA: {
    propertyB: {
      propertyC: true,
      propertyD: 0,
      propertyE: "true"
    },
    propertyF: false,
    propertyG: 1,
    propertyH: "false",
  },
  propertyI: true,
  propertyJ: 0,
  propertyK: "true",
}]
// All Nonvalid Properties - Series Assignment - 
const assignmentSourcesC = [{
  propertyA: {
    propertyB: {
      propertyC: "false",
    },
    propertyF: "true",
  },
  propertyI: "false",
}, {
  propertyA: {
    propertyB: {
      propertyD: "1",
    },
    propertyG: "0",
  },
  propertyJ: "1",
}, {
  propertyA: {
    propertyB: {
      propertyE: false,
    },
    propertyH: true,
  },
  propertyK: false,
}]
// All Nonvalid Properties - Single Assignment
const assignmentSourcesD = [{
  propertyA: {
    propertyB: {
      propertyC: "true",
      propertyD: "0",
      propertyE: true,
    },
    propertyF: "false",
    propertyG: "1",
    propertyH: true,
  },
  propertyI: "false",
  propertyJ: "1",
  propertyK: false,
}]
// Some Valid Properties - Series Assignment
const assignmentSourcesE = [{
  propertyA: {
    propertyB: {
      propertyC: false,
    },
    propertyF: "true",
  },
  propertyI: false,
}, {
  propertyA: {
    propertyB: {
      propertyD: "1",
    },
    propertyG: 0,
  },
  propertyJ: "1",
}, {
  propertyA: {
    propertyB: {
      propertyE: "false",
    },
    propertyH: true,
  },
  propertyK: "false",
}]
// Some Valid Properties - Single Assignment
const assignmentSourcesF = [{
  propertyA: {
    propertyB: {
      propertyC: true,
      propertyD: "0",
      propertyE: "true"
    },
    propertyF: "false",
    propertyG: 1,
    propertyH: false,
  },
  propertyI: true,
  propertyJ: "0",
  propertyK: "true",
}]
export {
  assignmentSourcesA,
  assignmentSourcesB,
  assignmentSourcesC,
  assignmentSourcesD,
  assignmentSourcesE,
  assignmentSourcesF,
}
