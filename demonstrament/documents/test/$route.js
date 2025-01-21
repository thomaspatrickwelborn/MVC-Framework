export default {
  active: false,
  name: 'Test',
  url: '/test',
  source: 'sections/test',
  target: 'localhost/test',
  main: 'index.html',
  ignore: ['schema', "content", "view", "draft"],
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
  pilers: {
    simules: [],
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