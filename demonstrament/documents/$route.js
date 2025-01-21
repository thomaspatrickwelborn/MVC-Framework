export default {
  active: true,
  name: 'Index',
  url: '/',
  source: 'sections',
  target: 'localhost',
  main: 'index.html',
  ignore: ['static-cms', 'test'],
  clear: {
    source: {
      path: ['**/template.js'],
      ignore: ['**/\$template.js'],
    },
    target: {
      path: ['*.{html,css,js,md,map,ico}'],
      ignore: [],
    },
  },
  pilers: {
    simules: [{
      type: 'simule',
      outputType: 'path',
      input: 'favicon.ico',
      output: 'favicon.ico',
      watch: ['favicon.ico'],
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
      external: ['/dependencies/mvc-framework.js'],
      ignore: ['**/\\$route.js'],
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