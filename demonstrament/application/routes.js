export default [
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
        '**/template.js'
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
        watch: ['**/*.{ejs,json}', '!static-cms'],
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
        watch: ['index.ejs', 'index.json'],
      }, {
        type: 'struct',
        outputType: 'client',
        input: '**/*.ejs',
        output: '',
        watch: ['**/*.ejs', '!index.ejs'],
      }],
    }
  }
]