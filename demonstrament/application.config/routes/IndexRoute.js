export default {
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
}