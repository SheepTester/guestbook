// @ts-check

import esbuild from 'esbuild'
import fs from 'fs/promises'
import express from 'express'
import runRender from './run-render.cjs'
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
  minify: true
})

if (serveMode) {
  const app = express()
  app.get('/', async (_req, res) => {
    await context.rebuild()
    await runRender()
    res.sendFile(
      fileURLToPath(new URL('../public/index.html', import.meta.url))
    )
  })
  app.get('/index.css', async (_req, res) => {
    await context.rebuild()
    await runRender()
    res.sendFile(fileURLToPath(new URL('../build/render.css', import.meta.url)))
  })
  app.listen(8080)
  console.log(`http://localhost:8080/`)
} else {
  await context.rebuild()
  await context.dispose()
  await import('../build/render.js')
  await fs.copyFile('build/render.css', 'public/index.css')
}
