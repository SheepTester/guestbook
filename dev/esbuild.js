// @ts-check

import esbuild from 'esbuild'
import express from 'express'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const args = process.argv.slice(2)
const serveMode = args.includes('--serve')

const context = await esbuild.context({
  entryPoints: ['src/render.tsx'],
  outdir: 'build/',
  platform: 'node',
  format: 'esm',
  packages: 'external',
  bundle: true,
  sourcemap: serveMode,
  minify: true
})

if (serveMode) {
  const app = express()
  app.get('/', async (_req, res) => {
    await context.rebuild()
    // https://stackoverflow.com/a/75057660
    await import('../build/render.js?_=' + Math.random())
    res.sendFile(
      fileURLToPath(new URL('../public/index.html', import.meta.url))
    )
  })
  app.get('/index.css', async (_req, res) => {
    await context.rebuild()
    res.sendFile(fileURLToPath(new URL('../build/render.css', import.meta.url)))
  })
  app.get('/render.css.map', async (_req, res) => {
    await context.rebuild()
    res.sendFile(
      fileURLToPath(new URL('../build/render.css.map', import.meta.url))
    )
  })
  app.get('/sheep3.css', async (_req, res) => {
    res.redirect('https://sheeptester.github.io/sheep3.css')
  })
  app.get('/sheep3.js', async (_req, res) => {
    res.redirect('https://sheeptester.github.io/sheep3.js')
  })
  app.get('/pensive.js', async (_req, res) => {
    res.header('Content-Type', 'text/javascript').send('')
  })
  app.listen(8080)
  console.log(`http://localhost:8080/`)
} else {
  await context.rebuild()
  await context.dispose()
  await fs.mkdir('public/', { recursive: true })
  await import('../build/render.js')
  await fs.copyFile('build/render.css', 'public/index.css')
}
