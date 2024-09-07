import Research from '/coutil/Research/index.js'
import DETObjectAssignTests from './DET-Object-Assign-Tests/index.js'
function DOMContentLoaded() {
  const research = new Research({
    type: "research",
    label: "Research",
    title: "MVC Framework",
    topicsLabel: "Research Topics",
    topics: [
      {
        type: "topic",
        label: "Topic", 
        title: "Dynamic Event Target",
        experiments: [
          {
            type: "experiment",
            label: "Experiment",
            title: "DET Object",
            hypotheses: [
              {
                type: "hypothesis",
                label: "Hypothesis",
                title: "DET Object Assign",
                tests: [
                  DETObjectAssignTests.testA(),
                  // DETObjectAssignTests.testB(),
                  // DETObjectAssignTests.testC(),
                  // DETObjectAssignTests.testD(),
                  // DETObjectAssignTests.testE(),
                ]
              }
            ]
          }
        ]
      },
      // DES()
    ],
  }, {
    // parent: document.querySelector('mvc-framework'),
  })
}
document.addEventListener(
  'DOMContentLoaded',
  DOMContentLoaded,
)
