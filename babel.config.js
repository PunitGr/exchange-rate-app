module.exports = {
  presets: ['@babel/typescript', '@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-modules-commonjs'
  ]
}
