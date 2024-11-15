import commonjs from '@rollup/plugin-commonjs'
export default {
  input: './index.js',
  output: [
    {
      file: '../distributement/mvc-framework.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: '../demonstrament/static/dependencies/mvc-framework.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  plugins: [commonjs({
    transformMixedEsModules: true
  })]
}