export default [
  {
    name: "Index",
    url: '/',
    source: 'documents',
    target: 'localhost',
    main: 'index.html',
    documents: [{
      simules: [{
        input: ['favicon.ico'],
        output: ['favicon.ico'],
        watch: ['favicon.ico', '!photo-application', '!other-application'],
      }, {
        input: ['**/*.md'],
        output: [''],
        watch: ['**/*.md', '!photo-application', '!other-application'],
      }],
      styles: [{
        input: 'index.scss',
        output: 'index.css',
        watch: ['**/*.scss', '!photo-application', '!other-application'],
      }],
      scripts: [{
        input: 'index.js',
        output: 'index.js',
        watch: ['**/*.js', '!photo-application', '!other-application'],
      }],
      structs: [{
        template: 'index.ejs',
        input: 'index.json',
        output: 'index.html',
        watch: ['**/*.{ejs,json}', '!photo-application', '!other-application'],
      }],
    }]
  },
  {
    name: "Photo Application",
    url: '/photo-application',
    source: 'documents/photo-application',
    target: 'localhost/photo-application',
    main: 'index.html',
    documents: [{
      simules: [{
        input: ['**/*.md'],
        output: [''],
        watch: ['**/*.md'],
      }],
      styles: [{
        input: 'index.scss',
        output: 'index.css',
        watch: ['**/*.scss'],
      }],
      scripts: [{
        input: 'index.js',
        output: 'index.js',
        watch: ['**/*.js'],
      }],
      structs: [{
        template: 'index.ejs',
        input: 'index.json',
        output: 'index.html',
        watch: ['**/*.{ejs,json}'],
      }],
    }]
  },
  {
    name: "Other Application",
    url: '/other-application',
    source: 'documents/other-application',
    target: 'localhost/other-application',
    main: 'index.html',
    documents: [{
      simules: [{
        input: ['**/*.md'],
        output: [''],
        watch: ['**/*.md'],
      }],
      styles: [{
        input: 'index.scss',
        output: 'index.css',
        watch: ['**/*.scss'],
      }],
      scripts: [{
        input: 'index.js',
        output: 'index.js',
        watch: ['**/*.js'],
      }],
      structs: [{
        template: 'index.ejs',
        input: 'index.json',
        output: 'index.html',
        watch: ['**/*.{ejs,json}'],
      }],
    }]
  }
]