export default {
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
}