import fs from 'fs/promises'
import { renderToStaticMarkup } from 'react-dom/server'
import YAML from 'yaml'
import { GuestbookComment } from '../dev/types'
import { Page } from './Page'
import './index.css'

const comments: GuestbookComment[] =
  YAML.parse(await fs.readFile('data/comments.yml', 'utf-8')) ?? []

fs.writeFile(
  './public/index.html',
  renderToStaticMarkup(<Page comments={comments} />)
)
