import { readFile } from 'node:fs/promises'
import certificates from './certificates.js'
certificates.key.file = await readFile(
  certificates.key.path
)
certificates.cert.file = await readFile(
  certificates.cert.path
)
export default {
  inspector: {
    port: 9238,
    host: "127.0.0.1",
  },
  https: {
    key: certificates.key.file,
    cert: certificates.cert.file,
    port: 3338,
    host: "demonstrament.mvc-framework",
  },
  browserSync: {
    port: 3339,
    host: "demonstrament.mvc-framework",
    https: {
      key: certificates.key.path,
      cert: certificates.cert.path,
    },
    files: [
      'localhost/**/*',
      'static/**/*'
    ]
  },
  express: {
    static: ['static', 'localhost']
  },
  routes: [
    {
      name: 'Index',
      url: '/',
      source: 'documents',
      target: 'localhost',
      main: 'index.html',
      clear: {
        target: [
          '*.{html,css,js,md,map}',
          '!static-cms',
        ],
        source: [
          '**/*template.js'
        ],
      },
      documents: {
        simules: [{
          type: 'simule',
          outputType: 'path',
          input: 'favicon.ico',
          output: 'favicon.ico',
          watch: ['favicon.ico'],
        }, {
          type: 'simule',
          outputType: 'glob',
          input: '**/*.md',
          output: '',
          watch: ['**/*.md', '!static-cms'],
        }],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: ['**/*.scss', '!static-cms'],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: ['**/*.js', '!static-cms'],
        }],
        structs: [{
          type: 'struct',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$.ejs', '!static-cms'],
        }, {
          type: 'struct',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs', '!index.ejs', '!static-cms'],
        }],
      }
    },
    {
      name: 'Static CMS',
      url: '/static-cms',
      source: 'documents/static-cms',
      target: 'localhost/static-cms',
      main: 'index.html',
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js'
        ],
      },
      documents: {
        simules: [{
          type: 'simule',
          outputType: 'glob',
          input: '**/*.md',
          output: '',
          watch: ['**/*.md'],
        }],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: ['**/*.scss'],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: ['**/*.js'],
        }],
        structs: [{
          type: 'struct',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$.ejs'],
        }, {
          type: 'struct',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs', '!index.ejs'],
        }],
      }
    }
  ],
}
