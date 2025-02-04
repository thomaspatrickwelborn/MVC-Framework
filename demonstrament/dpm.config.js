import { readFile } from 'node:fs/promises'
import certificates from './certificates.js'
export default {
  name: "MVC Framework Demonstrament",
  inspector: {
    port: 9238,
    host: "127.0.0.1",
  },
  server: {
    https: {
      key: await readFile(certificates.key.path),
      cert: await readFile(certificates.cert.path),
      port: 3338,
      host: "demonstrament.mvc-framework",
    },
  },
  browserSync: {
    port: 3339,
    open: false,
    ui: false, 
    host: "demonstrament.mvc-framework",
    https: {
      key: certificates.key.path,
      cert: certificates.cert.path,
    },
    files: ['static', 'localhost'],
    proxy: {
      ws: true,
    },
  },
  sockets: {
    protocol: "wss:",
    host: "demonstrament.mvc-framework",
    config: '$socket.js',
    source: 'documents',
    target: 'localhost',
  },
  router: {
    config: '$route.js',
    source: 'documents',
    static: [
      // $path, $options
      ['static', {}],
      ['localhost', {}],
    ],
  },
  documents: {
    config: '$document.js',
    source: 'documents',
    target: 'localhost',
  },
}