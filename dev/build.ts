import fs from 'fs/promises'
import YAML from 'yaml'
import { GuestbookComment } from './types'

const comments: GuestbookComment[] =
  YAML.parse(await fs.readFile('data/comments.yml', 'utf-8')) ?? []

await fs.mkdir('public/', { recursive: true })

await fs.writeFile(
  'public/index.html',
  [
    '<title>guestbook (wip)</title>',
    '<meta name="description" content="guestbook lol" />',
    '<style>:root { color-scheme: dark }</style>',
    `<ul>${comments
      .map(
        comment =>
          `<li>${comment.content.replaceAll(/[<>&"]/g, '')} &mdash; ${
            comment.author
          }</li>`
      )
      .join('')}</ul>`
  ].join('')
)
