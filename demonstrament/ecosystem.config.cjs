module.exports = {
  apps : [{
    name   : "mvc-framework-demonstrament",
    script : "index.js",
    watch: [
      "index.js", 
      "application",
      "temporary", 
      "tensils"
    ],
    node_args: "--inspect --trace-deprecation",
    execMode: "fork"
  }]
}
