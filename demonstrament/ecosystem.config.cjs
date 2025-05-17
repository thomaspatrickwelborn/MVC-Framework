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
        "static/dependencies//mvc-framework.js",
        "node_modules/core-plex/distributement",
        "node_modules/document-process-manager/development",
        "node_modules/objecture/distributement",
      ],
      args: "--config dpm.config.documents.js",
      autorestart: false,
      execMode: "fork",
    },
  ]
}
module.exports = EcosystemConfig
