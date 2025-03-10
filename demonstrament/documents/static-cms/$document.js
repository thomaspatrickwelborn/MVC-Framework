export default {
  active: false,
  name: 'Static CMS',
  path: '/static-cms',
  source: 'documents/static-cms',
  target: 'localhost/static-cms',
  main: 'index.html',
  ignore: [],
  pilers: {
    sans: [{
      target: 'target',
      path: ['**/*.{html,css,js,md}'],
      ignore: [],
    }, {
      source: 'source',
      path: ['**/template.js'],
      ignore: ['**/$template.js'],
    }],
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
      ignore: [
        '**/$route.js',
        '**/$document.js',
        '**/$socket.js',
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
      watch: ['**/*.{ejs,json}', '!**/\$.ejs'],
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