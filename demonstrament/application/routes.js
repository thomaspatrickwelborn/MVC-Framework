export default [
  {
    name: "Index",
    url: '/',
    source: 'documents',
    target: 'localhost',
    main: 'index.html',
    documents: [{
      styles: [{
        input: 'index.scss',
        output: 'index.css',
        watch: 'index.scss',
      }],
      scripts: [{
        input: 'index.js',
        output: 'index.js',
        watch: 'index.js',
      }],
      structs: [{
        template: 'index.ejs',
        input: 'index.json',
        output: 'index.html',
        watch: 'index.json',
      }],
    }]
  },
  {
    name: "Photo Application",
    url: '/photo-application',
    source: 'documents/photo-application',
    target: 'localhost/photo-application',
    documents: [{
      styles: [{
        input: 'index.scss',
        output: 'index.css',
        watch: '**/*.scss',
      }],
      scripts: [{
        input: 'index.js',
        output: 'index.js',
        watch: '**/*.js',
      }],
      structs: [{
        template: 'index.ejs',
        input: 'index.json',
        output: 'index.html',
        watch: '**/*.{ejs,json}',
      }],
    }]
  }
]