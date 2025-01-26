import { readFile } from 'node:fs/promises'
import certificates from './certificates.js'
certificates.key.file = await readFile(
  certificates.key.path
)
certificates.cert.file = await readFile(
  certificates.cert.path
)
export default {
  name: "MVC Framework Demonstrament", 
  inspector: {
    port: 9238,
    host: "127.0.0.1",
  },
  server: {
    https: {
      key: certificates.key.file,
      cert: certificates.cert.file,
      port: 3338,
      host: "demonstrament.mvc-framework",
    }
  },
  browserSync: {
    port: 3339,
    host: "demonstrament.mvc-framework",
    https: {
      key: certificates.key.path,
      cert: certificates.cert.path,
    },
    files: ['localhost', 'static']
  },
  router: {
    routeKey: '$route.js',
    source: 'documents',
    target: 'localhost',
    static: [
      // $path, $options
      ['static', {}],
      ['localhost', {}],
    ],
  },
}
