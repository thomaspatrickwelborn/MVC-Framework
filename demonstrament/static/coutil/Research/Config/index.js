export default {
  type: "research",
  label: "Research",
  topics: {
    label: "Topics",
    topic: {
      type: "topic",
      label: "Topic",
      experiments: {
        label: "Experiment",
        experiment: {
          type: "experiment",
          label: "Experiment",
          hypotheses: {
            label: "Hypotheses",
            hypothesis: {
              type: "hypothesis",
              label: "Hypothesis",
              tests: {
                label: "Tests",
                test: {
                  type: "test",
                  label: "Test",
                  proofs: {
                    label: "Proofs",
                    proof: {
                      type: "proof",
                      label: "Proof",
                      preconditions: {
                        label: "Preconditions",
                        precondition: {
                          type: "precondition",
                          label: "Precondition",
                          statement: {
                            label: "Statement"
                          }
                        }
                      },
                      arguments: {
                        label: "Arguments",
                        argument: {
                          type: "argument",
                          label: "Argument",
                          claim: {
                            label: "Claim"
                          },
                          premise: {
                            label: "Premise"
                          },
                          inference: {
                            label: "Inference"
                          }
                        }
                      },
                      conclusions: {
                        label: "Conclusions",
                        conclusion: {
                          type: "conclusion",
                          label: "Conclusion",
                          postconditions: {
                            label: "Postconditions",
                            postcondition: {
                              type: "postcondition",
                              label: "Postcondition"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}