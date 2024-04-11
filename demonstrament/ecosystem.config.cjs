module.exports = {
  apps : [{
    name   : "mvc-framework-demonstrament",
    script : "index.js",
    watch: [
      "index.js", "templates", "test", "utils", "views"
    ],
    node_args: "--inspect --trace-deprecation",
    execMode: "fork"
  }]
}
