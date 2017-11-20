module.exports = (ctx) => ({
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-import': {
      path: ['src'],
    },
    'postcss-cssnext': {
      browsers: [
        'last 2 versions',
        'ie >= 11',
      ]
    },
    'postcss-reporter': ctx.env === 'development' ? {
      clearMessages: true
    } : false,
  }
})
