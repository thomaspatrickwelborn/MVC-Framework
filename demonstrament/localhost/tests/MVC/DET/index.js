import ObjectExperiment from './Object/index.js'
export default function topic() {
  return {
    type: "topic",
    title: "Dynamic Event Target (DET)",
    experiments: [
      ObjectExperiment(),
      // ArrayExperiment(),
    ]
  }
}