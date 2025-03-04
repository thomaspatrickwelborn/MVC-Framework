const EcosystemConfig = {
  apps: [
    // {
    //   name: "MVC-Framework-Demonstrament-Databases",
    //   script: "dpm",
    //   watch: [
    //     "index.js",
    //     "package.json",
    //     "dpm.config.databases.js",
    //     "../../Document-Process-Manager/development"
    //   ],
    //   args: "--config \"./databases.dpm.config.js\"",
    //   execMode: "fork"
    // },
    {
      name: "MVC-Framework-Demonstrament-Documents",
      script: "dpm",
      watch: [
        "index.js",
        "package.json",
        "dpm.config.documents.js",
        "ecosystem.config.cjs",
        "../../Document-Process-Manager/development",
        "../../Core-Plex/distributement/core-plex.js",
      ],
      args: "--config dpm.config.documents.js",
      autorestart: false,
      execMode: "fork",
    },
  ]
}
module.exports = EcosystemConfig
