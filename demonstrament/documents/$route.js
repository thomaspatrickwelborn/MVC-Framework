export default {
  active: true,
  name: 'Index',
  url: '/',
  main: 'index.html',
  source: 'documents',
  target: 'localhost',
  ignore: ['static-cms', 'test'],
  pilers: {
    sans: [{
      name: 'ClearPiler',
      type: 'sans',
      target: 'source',
      path: ['**/template.js'],
      ignore: ['**/\$template.js'],
    }, {
      name: 'ClearPiler',
      type: 'sans',
      target: 'target',
      path: ['*.{html,css,js,md,map,ico}'],
      ignore: [],
    }],
    simules: [{
      name: 'SimulePiler',
      type: 'simules',
      outputType: 'path',
      input: 'favicon.ico',
      output: 'favicon.ico',
      watch: ['favicon.ico'],
      ignore: [],
    }],
    styles: [{
      name: 'SASSPiler',
      type: 'styles',
      input: 'index.scss',
      output: 'index.css',
      watch: ['**/*.scss'],
      ignore: [],
      inputOptions: {},
      outputOptions: {
        sourceMap: true,
      },
    }],
    scripts: [{
      name: 'RollupPiler',
      type: 'scripts',
      watch: ['**/*.js'],
      ignore: ['**/\\$route.js'],
      input: 'index.js',
      output: 'index.js',
      inputOptions: {},
      outputOptions: {
        format: 'es',
        sourcemap: true,
      },
    }],
    structs: [{
      name: 'EJSPiler',
      type: 'structs',
      outputType: 'server',
      model: 'index.json',
      input: 'index.ejs',
      output: 'index.html',
      watch: ['**/*.{ejs,json}'],
      ignore: ['**/\$*.ejs'],
      outputOptions: {
        localsName: '$content',
        root: ['templates']
      },
    }, {
      name: 'EJSPiler',
      type: 'structs',
      outputType: 'client',
      input: '**/*.ejs',
      output: '',
      watch: ['**/\$*.ejs'],
      ignore: [],
      outputOptions: {
        localsName: '$content',
        root: ['']
      }, 
    }],
  }
}