const EcosystemConfig = {
  apps: [
    {
      name: "MVC-Framework-Development",
      script: "rollup",
      watch: [
        "index.js",
        "**/*,js"
      ],
      args: "--config \"./rollup.config.js\"",
      execMode: "fork"
    },
  ]
}
module.exports = EcosystemConfig
