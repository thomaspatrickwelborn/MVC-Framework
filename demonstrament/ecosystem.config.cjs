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
    node_args: "--inspect=127.0.0.1:9235",
    execMode: "fork"
  }]
}
