export default {
  active: true,
  name: 'Test | Draft 7',
  path: '/test/draft/7',
  source: 'documents/test/draft/7',
  target: 'localhost/test/draft/7',
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
      watch: ['**/*.{ejs,json}', '**/\$*.ejs'],
      ignore: [],
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