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
      args: "--config dpm.config.documents.js",
      watch: [
        "index.js",
        "package.json",
        "dpm.config.documents.js",
        "ecosystem.config.cjs",
        "../node_modules/core-plex/distributement",
        "../node_modules/objecture/distributement",
        "../node_modules/document-process-manager/development",
        "../distributement",
      ],
      ignoreWatch: [
        "!../node_modules/core-plex/distributement",
        "!../node_modules/objecture/distributement",
        "!../node_modules/document-process-manager/development",
      ],
      watch_options: {
        followSymLinks: true,
      },
      autorestart: false,
      execMode: "fork",
    },
  ]
}
module.exports = EcosystemConfig
