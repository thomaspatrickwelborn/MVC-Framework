export default {
  input: './development/index.js',
  output: [
    {
      file: './distributement/mvc-framework.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: './demonstrament/static/dependencies/mvc-framework.js',
      format: 'es',
      sourcemap: true,
    }
  ]
}