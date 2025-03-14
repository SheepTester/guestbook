// Based on https://github.com/SheepTester/longer-tweets/blob/master/_data/GitHubIssuesAction.ts

export type User = {
  avatar_url: string
  html_url: string
  login: string
}

export type Action = {
  issue: {
    body: string
    created_at: string
    html_url: string
    number: number
    title: string
    updated_at: string
    user: User
  }
  sender: User
}

export type GuestbookComment = {
  author: string
  title: string
  content: string | null
  issue_number: number
  avatar: string
  timestamp: Date
}
