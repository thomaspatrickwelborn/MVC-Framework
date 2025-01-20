export default {
  active: false,
  name: 'Test | Content',
  url: '/test/content',
  source: 'documents/test/content',
  target: 'localhost/test/content',
  main: 'index.html',
  ignore: [],
  clear: {
    target: {
      path: ['/**/*.{html,css,js,md}'],
      ignore: [],
    },
    source: {
      path: ['**/template.js'],
      ignore: ['**/$template.js'],
    },
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
      ignore: [],
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
      ignore: [],
      external: ['/dependencies/mvc-framework.js']
    }],
    structs: [{
      type: 'struct',
      localsName: '$content',
      outputType: 'server',
      model: 'index.json',
      input: 'index.ejs',
      output: 'index.html',
      watch: ['**/*.{ejs,json}'],
      ignore: ['**/\$*.ejs'],
    }, {
      type: 'struct',
      localsName: '$content',
      outputType: 'client',
      input: '**/*.ejs',
      output: '',
      watch: ['**/\$*.ejs'],
      ignore: [],
    }],
  }
}