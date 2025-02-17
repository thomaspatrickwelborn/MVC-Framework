export default {
  active: true,
  name: 'Test | Schema',
  path: '/test/schema',
  source: 'documents/test/schema',
  target: 'localhost/test/schema',
  ignore: [],
  main: 'index.html',
  pilers: {
    sans: [{
      name: 'ClearPiler',
      type: 'sans',
      target: 'target', 
      path: ['**/*.{html,css,js,map}'],
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
      watch: [
        '**/*.scss', ,
        '../classes/**',
        '../coutil/**'
      ],
      ignore: [],
      inputOptions: {},
      outputOptions: {
        sourceMap: true,
      },
    }],
    scripts: [{
      name: 'RollupPiler',
      type: 'scripts',
      watch: [
        '**/*.js',
        '../classes/**',
        '../coutil/**'
      ],
      ignore: [
        '**/$route.js',
        '**/$document.js',
        '**/$socket.js',
      ],
      input: 'index.js',
      output: 'index.js',
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
      ignore: ['**/$*.ejs'],
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
      watch: ['**/$*.ejs'],
      ignore: [],
      outputOptions: {
        localsName: '$content',
        root: ['templates'],
      },
    }],
  }
}