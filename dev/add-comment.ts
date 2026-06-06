import fs from 'fs/promises'
import YAML from 'yaml'
import type { Action, GuestbookComment } from '../src/types'

const path = process.env.GITHUB_EVENT_PATH
if (!path) {
  console.error(`GITHUB_EVENT_PATH is required`)
  process.exit(1)
}
const { issue, sender }: Action = JSON.parse(await fs.readFile(path, 'utf-8'))

const comments: GuestbookComment[] =
  YAML.parse(await fs.readFile('data/comments.yml', 'utf-8')) ?? []

comments.push({
  author: sender.login,
  avatar: sender.avatar_url,
  title: issue.title,
  content: issue.body,
  issue_number: issue.number,
  timestamp: new Date(issue.updated_at)
})

await fs.writeFile('data/comments.yml', YAML.stringify(comments))
