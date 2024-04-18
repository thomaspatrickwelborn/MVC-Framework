module.exports = {
  apps : [{
    name   : "mvc-framework-demonstrament",
    script : "index.js",
    watch: [
      "index.js", 
      "temporary", 
      "tests", 
      "templates",
      "utils",
    ],
    node_args: "--inspect --trace-deprecation",
    execMode: "fork"
  }]
}
