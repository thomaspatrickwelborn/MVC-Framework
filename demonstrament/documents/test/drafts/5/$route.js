export default {
  active: false,
  name: 'Test | Draft 5',
  url: '/test/draft/5',
  source: 'documents/test/draft/5',
  target: 'localhost/test/draft/5',
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
    sections: [{
      type: 'section',
      watch: ['**/\$route.js'],
      ignore: [],
    }],
    styles: [{
      type: 'style',
      input: 'index.scss',
      output: 'index.css',
      watch: ['**/*.scss'],
      ignore: [],
    }],
    scripts: [{
      type: 'script',
      input: 'index.js',
      output: 'index.js',
      watch: ['**/*.js'],
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
      watch: ['**/*.{ejs,json}', '**/\$*.ejs'],
      ignore: [],
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