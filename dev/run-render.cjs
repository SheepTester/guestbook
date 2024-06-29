module.exports = function render () {
  delete require.cache[require.resolve('../build/render.js')]
  return import('../build/render.js')
}
