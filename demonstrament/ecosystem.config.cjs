module.exports = {
  apps : [{
    name   : "mvc-framework-demonstrament",
    script : "index.js",
    watch: [
      "index.js", 
      "application",
      "temporary", 
      "tensils", 
      "localhost"
    ],
    node_args: "--inspect --trace-deprecation",
    execMode: "fork"
  }]
}
