import fs from 'fs/promises'
import YAML from 'yaml'
import { Action, GuestbookComment } from '../src/types'

const { issue, sender }: Action = JSON.parse(process.env.COMMENT)

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
