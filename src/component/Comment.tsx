import Markdown from 'react-markdown'
import { GuestbookComment } from '../types'
import styles from './Comment.module.css'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export type CommentProps = {
  comment: GuestbookComment
}
export function Comment ({
  comment: { author, avatar, content, issue_number, timestamp }
}: CommentProps) {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <a className={styles.author} href={`https://github.com/${author}`}>
          <img
            className={styles.pfp}
            src={avatar}
            alt={`${author}'s GitHub profile picture`}
          />
          <span className={styles.username}>{author}</span>
        </a>
        <a
          className={styles.date}
          href={`https://github.com/SheepTester/guestbook/issues/${issue_number}`}
        >
          {new Date(timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timeZone: 'America/Los_Angeles'
          })}
        </a>
      </div>
      <div className={styles.content}>
        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{content}</Markdown>
      </div>
    </div>
  )
}
