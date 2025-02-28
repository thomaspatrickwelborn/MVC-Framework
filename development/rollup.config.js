import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
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
  plugins: [
    nodeResolve(),
    commonjs({ transformMixedEsModules: true }),
  ]
}