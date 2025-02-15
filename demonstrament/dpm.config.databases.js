import { readFile } from 'node:fs/promises'
import certificates from './certificates.js'
export default {
  name: "MVC Framework Demonstrament | Databases",
  inspector: {
    port: 9236,
    host: "127.0.0.1",
  },
  server: {
    https: {
      key: await readFile(certificates.key.path),
      cert: await readFile(certificates.cert.path),
      port: 3336,
      host: "databasement.mvc-framework",
    },
  },
  sockets: {
    host: "databasement.mvc-framework",
    config: '$socket.js',
    source: 'databases',
  },
  routers: {
    config: '$router.js',
    source: 'databases',
  },
  databases: {
    config: '$database',
    source: 'databases',
  },
}