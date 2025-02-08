const EcosystemConfig = {
  apps: [
    {
      name: "MVC-Framework-Development",
      autorestart: false,
      script: "npx",
      watch: [
        "index.js",
        "package.json",
        "**/*.js"
      ],
      args: "rollup --config rollup.config.js",
      execMode: "fork"
    },
  ]
}
module.exports = EcosystemConfig
