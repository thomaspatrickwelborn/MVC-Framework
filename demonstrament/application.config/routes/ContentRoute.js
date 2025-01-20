export default {
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
}