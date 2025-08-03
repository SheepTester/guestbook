import { Comment } from './component/Comment'
import { GuestbookComment } from './types'
import styles from './App.module.css'

export type AppProps = {
  comments: GuestbookComment[]
}
export function App ({ comments }: AppProps) {
  return (
    <div className={styles.comments}>
      <a
        className={styles.addComment}
        href='https://github.com/SheepTester/guestbook/issues/new?template=comment.md'
      >
        Add comment
      </a>
      {comments.reverse().map((comment, i) => (
        <Comment comment={comment} key={i} />
      ))}
    </div>
  )
}
