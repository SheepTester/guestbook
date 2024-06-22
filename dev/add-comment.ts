import fs from 'fs/promises'
import YAML from 'yaml'
import { Action, GuestbookComment } from './types'

const { issue, sender }: Action = JSON.parse(process.argv[2])

const comments: GuestbookComment[] =
  YAML.parse(await fs.readFile('data/comments.yml', 'utf-8')) ?? []

comments.push({
  author: sender.login,
  avatar: sender.avatar_url,
  content: issue.body,
  issue_number: issue.number,
  timestamp: new Date(issue.updated_at)
})

await fs.writeFile('data/comments.yml', YAML.stringify(comments))
