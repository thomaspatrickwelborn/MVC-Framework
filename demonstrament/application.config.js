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
      'localhost',
      'static'
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
      ignore: ['static-cms', 'test'],
      clear: {
        target: ['*.{html,css,js,md,map}'],
        source: ['**/[^$template].js'],
      },
      documents: {
        simules: [{
          type: 'simule',
          outputType: 'path',
          input: 'favicon.ico',
          output: 'favicon.ico',
          watch: ['favicon.ico'],
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
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Static CMS',
      url: '/static-cms',
      source: 'documents/static-cms',
      target: 'localhost/static-cms',
      main: 'index.html',
      ignore: [],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js'
        ],
      },
      documents: {
        simules: [],
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
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test',
      url: '/test',
      source: 'documents/test',
      target: 'localhost/test',
      main: 'index.html',
      ignore: ['schema', "content", "view", "draft"],
      clear: {
        target: [
          '/**/*.{html,css,js,md}'
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
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
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test | Schema',
      url: '/test/schema',
      source: 'documents/test/schema',
      target: 'localhost/test/schema',
      main: 'index.html',
      ignore: [],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: [
            '**/*.scss', ,
            '../classes/**',
            '../coutil/**'
          ],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: [
            '**/*.js',
            '../classes/**',
            '../coutil/**'
          ],
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test | Content',
      url: '/test/content',
      source: 'documents/test/content',
      target: 'localhost/test/content',
      main: 'index.html',
      ignore: [],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: [
            '**/*.scss', ,
            '../classes/**',
            '../coutil/**'
          ],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: [
            '**/*.js',
            '../classes/**',
            '../coutil/**'
          ],
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test | View',
      url: '/test/view',
      source: 'documents/test/view',
      target: 'localhost/test/view',
      main: 'index.html',
      ignore: [],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: [
            '**/*.scss', ,
            '../classes/**',
            '../coutil/**'
          ],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: [
            '**/*.js',
            '../classes/**',
            '../coutil/**'
          ],
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test | Draft',
      url: '/test/draft',
      source: 'documents/test/draft',
      target: 'localhost/test/draft',
      main: 'index.html',
      ignore: ["0", "1"],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: [
            '**/*.scss', ,
            '../classes/**',
            '../coutil/**'
          ],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: [
            '**/*.js',
            '../classes/**',
            '../coutil/**'
          ],
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test | Draft 0',
      url: '/test/draft/0',
      source: 'documents/test/draft/0',
      target: 'localhost/test/draft/0',
      main: 'index.html',
      ignore: [],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: [
            '**/*.scss', ,
            '../classes/**',
            '../coutil/**'
          ],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: [
            '**/*.js',
            '../classes/**',
            '../coutil/**'
          ],
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    },
    {
      name: 'Test | Draft 1',
      url: '/test/draft/0',
      source: 'documents/test/draft/1',
      target: 'localhost/test/draft/1',
      main: 'index.html',
      ignore: [],
      clear: {
        target: [
          '/**/*.{html,css,js,md}',
        ],
        source: [
          '**/template.js',
          '!**/$template.js'
        ],
      },
      documents: {
        simules: [],
        styles: [{
          type: 'style',
          input: 'index.scss',
          output: 'index.css',
          watch: [
            '**/*.scss', ,
            '../classes/**',
            '../coutil/**'
          ],
        }],
        scripts: [{
          type: 'script',
          input: 'index.js',
          output: 'index.js',
          watch: [
            '**/*.js',
            '../classes/**',
            '../coutil/**'
          ],
          external: ['/dependencies/mvc-framework.js']
        }],
        structs: [{
          type: 'struct',
          localsName: '$content',
          outputType: 'server',
          model: 'index.json',
          input: 'index.ejs',
          output: 'index.html',
          watch: ['**/*.{ejs,json}', '!**/\$*.ejs'],
        }, {
          type: 'struct',
          localsName: '$content',
          outputType: 'client',
          input: '**/*.ejs',
          output: '',
          watch: ['**/\$*.ejs'],
        }],
      }
    }
  ],
}
