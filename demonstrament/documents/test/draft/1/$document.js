export default {
  active: false,
  name: 'Test | Draft 1',
  path: '/test/draft/1',
  source: 'documents/test/draft/1',
  target: 'localhost/test/draft/1',
  main: 'index.html',
  ignore: [],
  pilers: {
    sans: [{
      name: 'ClearPiler',
      type: 'sans',
      target: 'target',
      path: ['**/*.{html,css,js,md}'],
      ignore: [],
    }, {
      name: 'ClearPiler',
      type: 'sans',
      target: 'source',
      path: ['**/template.js'],
      ignore: ['**/$template.js'],
    }],
    simules: [],
    styles: [{
      name: 'SASSPiler',
      type: 'styles',
      input: 'index.scss',
      output: 'index.css',
      watch: ['**/*.scss'],
      ignore: [],
    }],
    scripts: [{
      name: 'RollupPiler',
      type: 'scripts',
      input: 'index.js',
      output: 'index.js',
      watch: ['**/*.js'],
      ignore: [
        '**/$route.js',
        '**/$document.js',
        '**/$socket.js',
      ],
      inputOptions: {
        logLevel: 'silent', 
        external: ['/dependencies/mvc-framework.js'],
      },
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
        root: ['templates'],
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
        root: ['templates'],
      },
    }],
  }
}