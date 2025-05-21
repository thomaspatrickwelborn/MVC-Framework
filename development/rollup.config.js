import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
export default [{
  input: './index.js',
  treeshake: true,
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
    nodeResolve({ dedupe: ['core-plex'] }),
    commonjs({ transformMixedEsModules: true }),
  ]
}, {
  input: './index.js',
  treeshake: true,
  output: [
    {
      file: '../distributement/mvc-framework.min.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: '../demonstrament/static/dependencies/mvc-framework.min.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  plugins: [
    nodeResolve({ dedupe: ['core-plex'] }),
    commonjs({ transformMixedEsModules: true }),
    terser(),
  ]
}]